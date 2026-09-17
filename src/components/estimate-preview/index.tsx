"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PDFDocument } from "./pdf-document";
import { useEstimateStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { generatePDF } from "@/lib/pdf";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123; // 297mm at 96dpi

export function EstimatePreview() {
  const { estimate } = useEstimateStore();
  const pdfRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      // Use full container width with minimal padding
      const availableWidth = containerWidth - 16;
      const newScale = Math.min(availableWidth / A4_WIDTH_PX, 1);
      setScale(newScale);
    };

    updateScale();
    const timer = setTimeout(updateScale, 100);
    window.addEventListener("resize", updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScale);
    };
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

      if (pdfRef.current) {
        const clone = pdfRef.current.cloneNode(true) as HTMLElement;
        clone.style.transform = "none";
        printDiv.appendChild(clone);
      }

      printDiv.style.display = "block";
      generatePDF(filename);
      setShowGuide(true);
      setTimeout(() => setShowGuide(false), 8000);

      // Clean up after print dialog closes
      setTimeout(() => {
        if (document.body.contains(printDiv)) {
          document.body.removeChild(printDiv);
        }
      }, 3000);
    } finally {
      setIsGenerating(false);
    }
  }, [estimate]);

  useEffect(() => {
    const onDownloadEvent = () => handleDownloadPDF();
    document.addEventListener("download-pdf", onDownloadEvent);
    return () => document.removeEventListener("download-pdf", onDownloadEvent);
  }, [handleDownloadPDF]);

  // The visual (scaled) dimensions of the A4 sheet
  const scaledWidth = A4_WIDTH_PX * scale;
  const scaledHeight = A4_HEIGHT_PX * scale;

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

      {/* Print guide banner */}
      {showGuide && (
        <div className="bg-indigo-600 text-white text-xs px-4 py-2.5 flex items-center gap-2 shrink-0 animate-in slide-in-from-top-1">
          <span className="text-lg">📋</span>
          <span>
            <strong>In the print dialog:</strong> Set Destination → <strong>Save as PDF</strong>, Paper size → <strong>A4</strong>, Margins → <strong>None</strong>, enable <strong>Background graphics</strong>
          </span>
        </div>
      )}

      {/* Scroll area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-zinc-100/50 p-2"
      >
        {/*
          Key trick: give this container explicit scaled dimensions so the
          scroll area knows exactly how big the content is. The inner div
          uses transform:scale() anchored to top-left, then we nudge it
          with margin to center horizontally.
        */}
        <div
          style={{
            width: scaledWidth,
            height: scaledHeight,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: A4_WIDTH_PX,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <PDFDocument ref={pdfRef} estimate={estimate} />
          </div>
        </div>
      </div>
    </div>
  );
}
