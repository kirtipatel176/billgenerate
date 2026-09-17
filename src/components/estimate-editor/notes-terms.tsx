"use client";

import { useEstimateStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NotesTermsEditor() {
  const { estimate, setEstimate } = useEstimateStore();

  const handleNotesChange = (val: string) => {
    setEstimate({ notes: val.split("\n") });
  };

  const handleTermsChange = (val: string) => {
    setEstimate({ terms: val.split("\n") });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4 mb-4">
        <div className="p-2 bg-rose-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Notes & Terms</h2>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">Additional Notes</h3>
        <Textarea 
          value={estimate.notes.join("\n")} 
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={5}
          placeholder="Add your notes here (one per line)..."
        />
      </div>
      
      <div className="space-y-1.5 pt-4">
        <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">Terms & Conditions</h3>
        <Textarea 
          value={estimate.terms.join("\n")} 
          onChange={(e) => handleTermsChange(e.target.value)}
          rows={4}
          placeholder="Add terms and conditions here (one per line)..."
        />
      </div>
    </div>
  );
}
