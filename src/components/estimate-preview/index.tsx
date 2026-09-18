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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
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
    if (!pdfRef.current) return;
    setIsGenerating(true);
    setSuccess(false);
    try {
      const filename = `HydroCool-Estimate-${estimate.estimateDetails?.estimateNumber || "draft"}.pdf`;
      await generatePDF(pdfRef.current, filename);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? `PDF Error: ${error.message}` : "Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  }, [estimate]);

  useEffect(() => {
    const onDownloadEvent = () => handleDownloadPDF();
    document.addEventListener("download-pdf", onDownloadEvent);
    return () => document.removeEventListener("download-pdf", onDownloadEvent);
  }, [handleDownloadPDF]);

  const scaledWidth = A4_WIDTH_PX * scale;
  const scaledHeight = A4_HEIGHT_PX * scale;

  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/50 relative">
      {/* Header bar */}
      <div className="p-4 border-b border-indigo-100 bg-white/60 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
        <h2 className="font-bold text-sm tracking-widest text-indigo-900 uppercase flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Preview
        </h2>
        <Button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          size="sm"
          className={`gap-2 rounded-full px-5 transition-all hover:scale-105 shadow-md text-white ${
            success
              ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
          }`}
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : success ? (
            <span>✓</span>
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isGenerating ? "Generating..." : success ? "Downloaded!" : "Save PDF"}
        </Button>
      </div>

      {/* Scroll area — sized to scaled A4 dimensions */}
      <div ref={containerRef} className="flex-1 overflow-auto bg-zinc-100/50 p-2">
        <div style={{ width: scaledWidth, height: scaledHeight, margin: "0 auto", position: "relative" }}>
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
