import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Walk every element and inline computed rgb() colors so html2canvas
 * doesn't choke on oklch/lab values used by Tailwind v4.
 */
function inlineColors(root: HTMLElement) {
  const props = [
    "color", "backgroundColor",
    "borderTopColor", "borderBottomColor",
    "borderLeftColor", "borderRightColor",
  ] as const;

  const all = [root, ...Array.from(root.querySelectorAll("*"))];
  all.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    const cs = window.getComputedStyle(el);
    props.forEach((p) => {
      const v = cs[p];
      if (v && (v.includes("oklch") || v.includes("lab(") || v.includes("lch("))) {
        el.style[p] = "transparent";
      } else if (v && v.startsWith("rgb")) {
        el.style[p] = v;
      }
    });
  });
}

export async function generatePDF(element: HTMLElement, filename: string) {
  const PDF_W_MM = 210;
  const PDF_H_MM = 297;
  const A4_PX_W  = 794;  // 210mm @ 96dpi

  // ── 1. Temporarily widen the viewport so iOS Safari renders the full width ──
  let viewportMeta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
  const originalViewport = viewportMeta?.getAttribute("content") ?? "";

  if (!viewportMeta) {
    viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    document.head.appendChild(viewportMeta);
  }
  viewportMeta.setAttribute("content", `width=${A4_PX_W}, initial-scale=1`);

  // Give the browser time to reflow at the new viewport width
  await new Promise((r) => setTimeout(r, 300));

  // ── 2. Clone onto body at full A4 width ──
  const clone = element.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position:      "fixed",
    top:           "0",
    left:          "0",
    zIndex:        "-99999",
    transform:     "none",
    transformOrigin:"top left",
    width:         `${A4_PX_W}px`,
    minHeight:     "1123px",
    background:    "white",
    pointerEvents: "none",
    visibility:    "visible",
    opacity:       "1",
    overflow:      "visible",
  });
  document.body.appendChild(clone);

  try {
    // Wait for fonts/images inside clone to settle
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 400));

    // Patch oklch → rgb so html2canvas renders all colours correctly
    inlineColors(clone);

    const totalHeight = clone.scrollHeight || 1123;

    const canvas = await html2canvas(clone, {
      scale:       2,
      useCORS:     true,
      allowTaint:  true,
      logging:     false,
      backgroundColor: "#ffffff",
      width:       A4_PX_W,
      height:      totalHeight,
      windowWidth: A4_PX_W,
      windowHeight:totalHeight,
      scrollX:     0,
      scrollY:     0,
      x:           0,
      y:           0,
    });

    if (!canvas.width || !canvas.height) {
      throw new Error(`Canvas is empty (${canvas.width}×${canvas.height}). Try again.`);
    }

    // ── 3. Build a multi-page PDF ──
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pxPerMm        = canvas.width / PDF_W_MM;          // px per mm in the canvas
    const pageHeightPx   = PDF_H_MM * pxPerMm;               // canvas rows per A4 page
    const pageCount      = Math.ceil(canvas.height / pageHeightPx);

    for (let page = 0; page < pageCount; page++) {
      if (page > 0) pdf.addPage();

      const srcY = page * pageHeightPx;
      const srcH = Math.min(pageHeightPx, canvas.height - srcY);

      // Slice this page from the full canvas
      const pageCanvas    = document.createElement("canvas");
      pageCanvas.width    = canvas.width;
      pageCanvas.height   = pageHeightPx;           // always full page height
      const ctx           = pageCanvas.getContext("2d")!;
      ctx.fillStyle       = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

      pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, PDF_W_MM, PDF_H_MM);
    }

    // ── 4. Save / open PDF ──
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      // iOS Safari blocks programmatic file downloads — open in new tab so user can
      // tap Share → Save to Files / AirDrop / etc.
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const newTab = window.open(url, "_blank");
      if (!newTab) {
        // If popup was blocked, fall back to an anchor click
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } else {
      pdf.save(filename);
    }

  } finally {
    // ── 4. Clean up ──
    if (document.body.contains(clone)) document.body.removeChild(clone);

    // Restore original viewport
    if (originalViewport) {
      viewportMeta.setAttribute("content", originalViewport);
    } else {
      viewportMeta.setAttribute("content", "width=device-width, initial-scale=1");
    }
  }
}
