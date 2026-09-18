"use client";

import { useState, useEffect } from "react";
import { EstimateEditor } from "@/components/estimate-editor";
import { EstimatePreview } from "@/components/estimate-preview";
import { generateEstimateNumber } from "@/lib/calculations";
import { useEstimateStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { resetEstimate, estimate, updateEstimateDetails } = useEstimateStore();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Set today's date on client mount if still using the default placeholder
  useEffect(() => {
    if (estimate.estimateDetails.estimateDate === "2025-01-01") {
      updateEstimateDetails({ estimateDate: new Date().toISOString().split("T")[0] });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewEstimate = () => {
    if (confirm("Are you sure you want to create a new estimate? Current unsaved changes will be lost.")) {
      const currentNumber = parseInt(estimate.estimateDetails.estimateNumber.replace("EST-", "")) || 0;
      resetEstimate(generateEstimateNumber(currentNumber));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col selection:bg-indigo-500/20 selection:text-indigo-700">
      {/* Premium Glass Header */}
      <header className="sticky top-0 z-40 w-full glass border-b-white/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              HYDROCOOL <span className="font-medium text-slate-500">SERVICES</span>
            </h1>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-indigo-500/80 hidden sm:block uppercase ml-7">
              AC • RO • GEYSER • WASHING MACHINE
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleNewEstimate} 
              className="hidden sm:flex gap-2 shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              New Estimate
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-10rem)]">
          {/* Left / Main Area - Editor */}
          <div className="h-full lg:col-span-5 xl:col-span-4 overflow-y-auto pr-2 custom-scrollbar pb-20 lg:pb-0">
            <EstimateEditor />
          </div>

          {/* Right Area - Live Preview (Desktop only) */}
          <div className="hidden lg:block lg:col-span-7 xl:col-span-8 h-full bg-slate-100/50 rounded-3xl p-6 border border-slate-200/60 premium-shadow relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative h-full w-full z-10 flex items-center justify-center">
              <EstimatePreview />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass rounded-2xl p-2 shadow-2xl shadow-indigo-900/10 z-50 flex items-center justify-between gap-2 border border-white/50">
        <Button variant="ghost" className="flex-1 flex flex-col gap-1 h-14 rounded-xl hover:bg-indigo-50/50" onClick={handleNewEstimate}>
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">New</span>
        </Button>
        
        <div className="w-px h-8 bg-slate-200" />
        
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogTrigger render={<Button className="flex-1 flex flex-col gap-1 h-14 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20" />}>
            <Eye className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Preview</span>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 flex flex-col bg-slate-50 border-0 rounded-2xl overflow-hidden shadow-2xl">
             <div className="h-full w-full overflow-auto bg-slate-100/50 p-4">
                <EstimatePreview />
             </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
