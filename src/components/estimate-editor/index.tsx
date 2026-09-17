"use client";

import { BusinessDetailsEditor } from "./business-details";
import { CustomerDetailsEditor } from "./customer-details";
import { EstimateDetailsEditor } from "./estimate-details";
import { ItemTableEditor } from "./item-table";
import { NotesTermsEditor } from "./notes-terms";

export function EstimateEditor() {
  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-6 space-y-8 pb-32">
      <div className="space-y-6">
        <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 border-t-4 border-t-indigo-500">
          <BusinessDetailsEditor />
        </div>
        
        <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 border-t-4 border-t-emerald-500">
          <CustomerDetailsEditor />
        </div>

        <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 border-t-4 border-t-amber-500">
          <EstimateDetailsEditor />
        </div>

        <div className="glass rounded-2xl p-1 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 border-t-4 border-t-blue-500 overflow-hidden">
          <div className="p-4 sm:p-0">
            <ItemTableEditor />
          </div>
        </div>

        <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10 border-t-4 border-t-rose-500">
          <NotesTermsEditor />
        </div>
      </div>
    </div>
  );
}
