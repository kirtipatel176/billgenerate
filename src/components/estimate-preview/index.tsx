"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PDFDocument } from "./pdf-document";
import { useEstimateStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { generatePDF } from "@/lib/pdf";

export function EstimatePreview() {
  const { estimate } = useEstimateStore();
  const pdfRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Responsive scaling logic for the A4 document
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const a4WidthPx = 794;
      const padding = 32;
      const availableWidth = containerWidth - padding;
      const newScale = Math.min(availableWidth / a4WidthPx, 1);
      setScale(newScale);
    };

    updateScale();
    setTimeout(updateScale, 50);
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [estimate.items.length]);

  const handleDownloadPDF = useCallback(async () => {
    setIsGenerating(true);
    try {
      const filename = `HydroCool-Estimate-${estimate.estimateDetails?.estimateNumber || "draft"}.pdf`;
      // Inject a hidden print container onto the body
      const printDiv = document.createElement("div");
      printDiv.id = "pdf-print-target";
      printDiv.style.display = "none";
      document.body.appendChild(printDiv);

      // We need to render the React component into it — use the cloned DOM from our ref
      if (pdfRef.current) {
        const clone = pdfRef.current.cloneNode(true) as HTMLElement;
        clone.style.transform = "none";
        printDiv.appendChild(clone);
      }

      printDiv.style.display = "block";
      generatePDF(filename);

      // Clean up after print dialog closes
      setTimeout(() => {
        if (document.body.contains(printDiv)) {
          document.body.removeChild(printDiv);
        }
      }, 2000);
    } finally {
      setIsGenerating(false);
    }
  }, [estimate]);

  useEffect(() => {
    const onDownloadEvent = () => handleDownloadPDF();
    document.addEventListener("download-pdf", onDownloadEvent);
    return () => document.removeEventListener("download-pdf", onDownloadEvent);
  }, [handleDownloadPDF]);

  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/50 relative">
      <div className="p-4 border-b border-indigo-100 bg-white/60 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
        <h2 className="font-bold text-sm tracking-widest text-indigo-900 uppercase flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Preview
        </h2>
        <Button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          size="sm"
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 rounded-full px-5 transition-all hover:scale-105"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isGenerating ? "Generating..." : "Save PDF"}
        </Button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-zinc-100/50 p-4 flex justify-center items-start"
      >
        <div
          ref={wrapperRef}
          className="origin-top flex justify-center pb-8"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
        >
          <PDFDocument ref={pdfRef} estimate={estimate} />
        </div>
      </div>
    </div>
  );
}
