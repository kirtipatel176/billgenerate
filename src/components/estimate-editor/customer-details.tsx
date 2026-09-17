"use client";

import { useEstimateStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CustomerDetailsEditor() {
  const { estimate, updateCustomerInfo, updateServiceLocation } = useEstimateStore();
  const info = estimate.customerInfo || {};
  const serviceLoc = estimate.serviceLocation || {};

  return (
    <div className="space-y-8">
      {/* Customer Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Customer Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="c-name">Customer Name</Label>
            <Input 
              id="c-name" 
              value={info.name || ""} 
              onChange={(e) => updateCustomerInfo({ name: e.target.value })} 
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-phone">Phone</Label>
            <Input 
              id="c-phone" 
              value={info.phone || ""} 
              onChange={(e) => updateCustomerInfo({ phone: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email">Email</Label>
            <Input 
              id="c-email" 
              type="email"
              value={info.email || ""} 
              onChange={(e) => updateCustomerInfo({ email: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="c-address">Address</Label>
            <Textarea 
              id="c-address" 
              value={info.address || ""} 
              onChange={(e) => updateCustomerInfo({ address: e.target.value })} 
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-city">City</Label>
            <Input 
              id="c-city" 
              value={info.city || ""} 
              onChange={(e) => updateCustomerInfo({ city: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-state">State</Label>
            <Input 
              id="c-state" 
              value={info.state || ""} 
              onChange={(e) => updateCustomerInfo({ state: e.target.value })} 
            />
          </div>
        </div>
      </div>

      {/* Service Location (If Different) */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
          <div className="p-2 bg-slate-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Service Location (If Different)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="s-name">Location/Contact Name</Label>
            <Input 
              id="s-name" 
              value={serviceLoc.name || ""} 
              onChange={(e) => updateServiceLocation({ name: e.target.value })} 
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-phone">Contact Phone</Label>
            <Input 
              id="s-phone" 
              value={serviceLoc.phone || ""} 
              onChange={(e) => updateServiceLocation({ phone: e.target.value })} 
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="s-address">Service Address</Label>
            <Textarea 
              id="s-address" 
              value={serviceLoc.address || ""} 
              onChange={(e) => updateServiceLocation({ address: e.target.value })} 
              rows={2}
              placeholder="Optional"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
