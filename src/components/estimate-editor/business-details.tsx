"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BusinessDetailsEditor() {
  const { estimate, updateBusinessInfo } = useEstimateStore();
  const info = estimate.businessInfo || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Business Profile</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="b-name">Business Name</Label>
          <Input 
            id="b-name" 
            value={info.name || ""} 
            onChange={(e) => updateBusinessInfo({ name: e.target.value })} 
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-services">Services</Label>
          <Input 
            id="b-services" 
            value={info.services || ""} 
            onChange={(e) => updateBusinessInfo({ services: e.target.value })} 
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-proprietor">Proprietor</Label>
          <Input 
            id="b-proprietor" 
            value={info.proprietor || ""} 
            onChange={(e) => updateBusinessInfo({ proprietor: e.target.value })} 
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-phone">Phone</Label>
          <Input 
            id="b-phone" 
            value={info.phone || ""} 
            onChange={(e) => updateBusinessInfo({ phone: e.target.value })} 
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="b-address">Address</Label>
          <Textarea 
            id="b-address" 
            value={info.address || ""} 
            onChange={(e) => updateBusinessInfo({ address: e.target.value })} 
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
