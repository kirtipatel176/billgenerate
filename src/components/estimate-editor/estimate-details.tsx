"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EstimateDetailsEditor() {
  const { estimate, updateEstimateDetails } = useEstimateStore();
  const details = estimate.estimateDetails || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Estimate Details</h2>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="est-number">Estimate Number</Label>
        <Input
          id="est-number"
          value={details.estimateNumber || ""}
          onChange={(e) => updateEstimateDetails({ estimateNumber: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="est-date">Estimate Date</Label>
        <Input
          id="est-date"
          type="date"
          value={details.estimateDate || ""}
          onChange={(e) => updateEstimateDetails({ estimateDate: e.target.value })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="est-valid">Valid Until</Label>
        <Input
          id="est-valid"
          type="date"
          value={details.validUntil || ""}
          onChange={(e) => updateEstimateDetails({ validUntil: e.target.value })}
        />
      </div>
    </div>

  );
}
