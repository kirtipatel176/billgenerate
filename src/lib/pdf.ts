import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Recursively walk every element in a tree and replace any oklch / lab / lch
 * color values in computed styles with their computed sRGB equivalents.
 * This makes html2canvas work correctly with Tailwind v4 on all browsers.
 */
function resolveOklchColors(root: HTMLElement) {
  const elements = root.querySelectorAll("*");
  const allEls: Element[] = [root, ...Array.from(elements)];

  const colorProps = [
    "color",
    "backgroundColor",
    "borderTopColor",
    "borderBottomColor",
    "borderLeftColor",
    "borderRightColor",
    "outlineColor",
    "fill",
    "stroke",
  ] as const;

  allEls.forEach((el) => {
    if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
    const computed = window.getComputedStyle(el);

    colorProps.forEach((prop) => {
      const val = computed[prop as keyof CSSStyleDeclaration] as string;
      if (!val) return;
      // If the browser already resolved it to rgb/rgba we can use it directly.
      // Only patch if it still contains oklch/lab/lch (older Safari).
      if (
        val.includes("oklch") ||
        val.includes("lab(") ||
        val.includes("lch(")
      ) {
        // Fallback: set transparent so at least it won't crash the renderer
        (el as HTMLElement).style[prop as any] = "transparent";
      } else if (val.startsWith("rgb")) {
        (el as HTMLElement).style[prop as any] = val;
      }
    });
  });
}

export async function generatePDF(element: HTMLElement, filename: string) {
  // Clone to body so it's fully laid out, unaffected by transforms/overflow
  const clone = element.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-99999",
    transform: "none",
    transformOrigin: "top left",
    width: "794px",      // 210mm at 96dpi
    minHeight: "1123px", // 297mm at 96dpi
    background: "white",
    pointerEvents: "none",
    visibility: "visible",
    opacity: "1",
    overflow: "visible",
  });

  document.body.appendChild(clone);

  try {
    // Let the browser fully paint the clone (important for Safari)
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 400));

    // Patch oklch colors so html2canvas doesn't choke
    resolveOklchColors(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      height: clone.scrollHeight,
      windowWidth: 794,
      windowHeight: clone.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    });

    if (!canvas.width || !canvas.height) {
      throw new Error(`Canvas is empty (${canvas.width}×${canvas.height})`);
    }

    // A4 in mm
    const PDF_W = 210;
    const PDF_H = 297;

    // How many A4 pages does the content need?
    const contentHeightMm = (canvas.height / canvas.width) * PDF_W;
    const pageCount = Math.ceil(contentHeightMm / PDF_H);

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    for (let page = 0; page < pageCount; page++) {
      if (page > 0) pdf.addPage();

      // Slice the canvas for this page
      const srcY = (page * PDF_H * canvas.width) / PDF_W;
      const srcH = (PDF_H * canvas.width) / PDF_W;

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = srcH;
      const ctx = pageCanvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

      const imgData = pageCanvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData, "JPEG", 0, 0, PDF_W, PDF_H);
    }

    pdf.save(filename);
  } finally {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
}
