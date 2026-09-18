import React, { forwardRef } from "react";
import { Estimate } from "@/types/estimate";
import { formatCurrency } from "@/lib/calculations";
import { Phone, MapPin, CheckCircle, ShieldCheck, ThumbsUp, Users, Airplay, Droplets, ThermometerSun, WashingMachine, FileText, User } from "lucide-react";

interface PDFDocumentProps {
  estimate: Estimate;
}

export const PDFDocument = forwardRef<HTMLDivElement, PDFDocumentProps>(({ estimate }, ref) => {
  const { businessInfo, customerInfo, serviceLocation, estimateDetails, items, subtotal, discount, taxRate, total, notes, terms } = estimate;

  return (
    <div 
      ref={ref} 
      className="bg-white text-[#1e293b] font-sans mx-auto relative overflow-hidden shrink-0 flex flex-col"
      style={{
        width: "210mm",
        minHeight: "297mm",
        boxShadow: "0 0 40px rgba(0,0,0,0.1)",
      }}
    >
      {/* HEADER SECTION */}
      <div className="flex justify-between items-stretch pt-6 pl-8 relative h-[140px]">
        {/* Left Logo Area */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", zIndex: 10, width: "58%" }}>
          {/* Premium SVG Logo Mark */}
          <svg width="72" height="88" viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shield base */}
            <path d="M36 2L6 14V42C6 60 19 75.5 36 82C53 75.5 66 60 66 42V14L36 2Z" fill="#1e3a8a"/>
            <path d="M36 2L6 14V42C6 60 19 75.5 36 82C53 75.5 66 60 66 42V14L36 2Z" stroke="#0ea5e9" strokeWidth="2.5"/>
            {/* Inner shield highlight */}
            <path d="M36 8L12 18V42C12 57 23 70.5 36 76C49 70.5 60 57 60 42V18L36 8Z" fill="#1e40af"/>
            {/* Water drop */}
            <path d="M36 22C36 22 26 34 26 41C26 46.52 30.48 51 36 51C41.52 51 46 46.52 46 41C46 34 36 22 36 22Z" fill="#0ea5e9"/>
            {/* Snowflake/AC symbol inside drop */}
            <line x1="36" y1="32" x2="36" y2="48" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="29" y1="36" x2="43" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="43" y1="36" x2="29" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Orange bottom bar */}
            <rect x="6" y="78" width="60" height="8" rx="4" fill="#f97316"/>
            {/* Stars on shield */}
            <circle cx="18" cy="24" r="2" fill="#bfdbfe" fillOpacity="0.6"/>
            <circle cx="54" cy="24" r="2" fill="#bfdbfe" fillOpacity="0.6"/>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ fontSize: "2.6rem", fontWeight: 900, lineHeight: 1, margin: 0, letterSpacing: "-0.03em", fontFamily: "Arial Black, Arial, sans-serif" }}>
              <span style={{ color: "#0ea5e9" }}>Hydro</span><span style={{ color: "#f97316" }}>Cool</span>
            </h1>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.38em", color: "#1e3a8a", lineHeight: 1, margin: "4px 0 3px", fontFamily: "Arial, sans-serif" }}>S E R V I C E S</p>
            <p style={{ fontSize: "0.72rem", fontStyle: "italic", color: "#475569", margin: 0, fontFamily: "Georgia, serif" }}>Built on Trust. Driven by Service.</p>
          </div>
        </div>

        
        {/* Right Info Area - Curved Blue Background */}
        <div className="absolute right-0 top-0 h-[170px] w-[350px] bg-[#1e3a8a] text-white rounded-bl-[80px] p-6 z-0 flex flex-col justify-center shadow-lg">
          <div className="pl-6 pt-2">
            <h3 className="font-bold text-lg mb-3">Pro. {businessInfo.proprietor}</h3>
            <div className="flex items-start gap-3 mb-3 text-sm">
              <div className="bg-white rounded-full p-1 shrink-0"><Phone className="w-3.5 h-3.5 text-[#1e3a8a]" /></div>
              <span className="font-medium pt-0.5">{businessInfo.phone}</span>
            </div>
            <div className="flex items-start gap-3 text-xs leading-tight">
              <div className="bg-white rounded-full p-1 shrink-0"><MapPin className="w-3.5 h-3.5 text-[#1e3a8a]" /></div>
              <span className="w-48 whitespace-pre-line">{businessInfo.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Ribbon & Icons */}
      <div className="flex justify-between items-center px-8 mt-6 h-12 relative z-10">
        <div className="flex gap-10 font-bold text-[10px] uppercase tracking-wider text-[#0f172a] ml-4">
          <div className="flex flex-col items-center gap-1.5"><div className="border rounded p-1 shadow-sm"><Airplay className="w-6 h-6 text-[#475569]" /></div><span>AC</span></div>
          <div className="flex flex-col items-center gap-1.5"><div className="border rounded p-1 shadow-sm"><Droplets className="w-6 h-6 text-[#475569]" /></div><span>RO</span></div>
          <div className="flex flex-col items-center gap-1.5"><div className="border rounded p-1 shadow-sm"><ThermometerSun className="w-6 h-6 text-[#475569]" /></div><span>Geyser</span></div>
          <div className="flex flex-col items-center gap-1.5 text-center w-20 leading-tight"><div className="border rounded p-1 shadow-sm"><WashingMachine className="w-6 h-6 text-[#475569]" /></div><span>Washing Machine</span></div>
        </div>
        <div className="bg-[#0ea5e9] text-white py-2.5 px-8 text-sm absolute right-0 w-[350px] shadow-md rounded-l-3xl">
          <div className="pl-6 font-serif italic font-medium" style={{ fontFamily: '"Brush Script MT", "Comic Sans MS", cursive', fontSize: '1.1rem' }}>
            All Your Home Service Solutions<br/><span className="pl-4">Under One Roof</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8 flex-1 mt-8 z-10 bg-white">
        {/* Title Area */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-[3.25rem] font-black text-[#1e3a8a] tracking-tight leading-none mb-1">ESTIMATE</h2>
            <p className="text-[#334155] tracking-[0.2em] text-sm font-semibold uppercase">Quotation For Services</p>
          </div>
          <div className="w-64 border-2 border-[#e2e8f0] rounded bg-[#f8fafc]">
            <div className="flex border-b-2 border-[#e2e8f0] p-2">
              <span className="font-bold text-[#1e3a8a] w-28 text-sm">Estimate No. :</span>
              <span className="text-[#334155] text-sm font-medium">{estimateDetails.estimateNumber}</span>
            </div>
            <div className="flex p-2">
              <span className="font-bold text-[#1e3a8a] w-28 text-sm">Estimate Date :</span>
              <span suppressHydrationWarning className="text-[#334155] text-sm font-medium">{estimateDetails.estimateDate}</span>
            </div>
          </div>
        </div>

        {/* Details Blocks */}
        <div className="flex gap-4 mb-6">
          {/* Customer Details */}
          <div className="flex-1 border-2 border-[#1e3a8a] rounded-lg overflow-hidden">
            <div className="bg-[#1e3a8a] text-white px-3 py-1.5 font-bold flex items-center gap-2 text-sm">
              <User className="w-4 h-4" /> Customer Details
            </div>
            <div className="p-3 text-sm space-y-3 text-[#334155] font-medium bg-[#f8fafc]">
              <div className="flex items-end border-b border-[#cbd5e1] pb-1"><span className="w-24">Name</span><span className="px-2">:</span><span className="flex-1">{customerInfo.name}</span></div>
              <div className="flex items-end border-b border-[#cbd5e1] pb-1"><span className="w-24">Address</span><span className="px-2">:</span><span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{customerInfo.address}</span></div>
              <div className="flex items-end border-b border-[#cbd5e1] pb-1"><span className="w-24">Contact No.</span><span className="px-2">:</span><span className="flex-1">{customerInfo.phone}</span></div>
            </div>
          </div>

          {/* Service Location */}
          <div className="flex-1 border-2 border-[#1e3a8a] rounded-lg overflow-hidden">
            <div className="bg-[#1e3a8a] text-white px-3 py-1.5 font-bold flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" /> Service Location (If Different)
            </div>
            <div className="p-3 text-sm space-y-3 text-[#334155] font-medium bg-[#f8fafc]">
              <div className="flex items-end border-b border-[#cbd5e1] pb-1"><span className="w-24">Name</span><span className="px-2">:</span><span className="flex-1">{serviceLocation?.name || ''}</span></div>
              <div className="flex items-end border-b border-[#cbd5e1] pb-1"><span className="w-24">Address</span><span className="px-2">:</span><span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{serviceLocation?.address || ''}</span></div>
              <div className="flex items-end border-b border-[#cbd5e1] pb-1"><span className="w-24">Contact No.</span><span className="px-2">:</span><span className="flex-1">{serviceLocation?.phone || ''}</span></div>
            </div>
          </div>
        </div>

        {/* Item Table */}
        <div className="border border-[#cbd5e1] overflow-hidden mb-6 relative">
          {/* Background Watermark Shield */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
            <ShieldCheck className="w-64 h-64 text-[#1e3a8a]" />
          </div>

          <table className="w-full text-sm text-[#0f172a] relative z-10">
            <thead className="bg-[#bae6fd] text-[#1e3a8a] border-b border-[#cbd5e1]">
              <tr>
                <th className="py-2 px-2 text-center font-bold border-r border-[#cbd5e1] w-12">Sr. No.</th>
                <th className="py-2 px-4 text-left font-bold border-r border-[#cbd5e1]">Item Name / Description</th>
                <th className="py-2 px-2 text-center font-bold border-r border-[#cbd5e1] w-28">Rate (₹)</th>
                <th className="py-2 px-2 text-center font-bold w-32">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cbd5e1]">
              {items.map((item, index) => (
                <tr key={item.id} className="min-h-[32px]">
                  <td className="py-1.5 px-2 text-center font-medium border-r border-[#cbd5e1]">{index + 1}</td>
                  <td className="py-1.5 px-4 border-r border-[#cbd5e1] font-medium">{item.description}</td>
                  <td className="py-1.5 px-2 text-right border-r border-[#cbd5e1] font-medium">{item.rate}</td>
                  <td className="py-1.5 px-2 text-right font-medium">{item.amount > 0 ? item.amount : ""}</td>
                </tr>
              ))}
              {/* Fill empty rows to make table look complete (exactly 6 rows total like the template) */}
              {Array.from({ length: Math.max(0, 6 - items.length) }).map((_, i) => (
                <tr key={`empty-${i}`} className="h-[32px]">
                  <td className="border-r border-[#cbd5e1]"></td>
                  <td className="border-r border-[#cbd5e1]"></td>
                  <td className="border-r border-[#cbd5e1]"></td>
                  <td className="border-r border-[#cbd5e1]"></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Section: Notes & Totals */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-4 pr-4">
            {/* Notes */}
            {notes.length > 0 && (
              <div>
                <h4 className="text-[13px] font-bold text-[#1e3a8a] flex items-center gap-1.5 mb-1">
                  <FileText className="w-4 h-4 fill-[#1e3a8a] text-white" /> Notes:
                </h4>
                <div className="text-xs text-[#0f172a] pl-5 leading-snug font-medium">
                  {notes.map((note, i) => <div key={i}>{note}</div>)}
                </div>
              </div>
            )}
            {/* Terms */}
            {terms.length > 0 && (
              <div>
                <h4 className="text-[13px] font-bold text-[#1e3a8a] flex items-center gap-1.5 mb-1 mt-2">
                  <FileText className="w-4 h-4 fill-[#1e3a8a] text-white" /> Terms & Conditions:
                </h4>
                <div className="text-xs text-[#0f172a] pl-5 leading-snug font-medium">
                  {terms.map((term, i) => <div key={i}>{term}</div>)}
                </div>
              </div>
            )}
          </div>

          <div className="w-[280px] border border-[#cbd5e1] h-fit bg-white -mt-[1px]">
            <div className="flex border-b border-[#cbd5e1] p-2">
              <span className="font-bold text-[#0f172a] flex-1 text-sm">Subtotal</span>
              <span className="text-[#0f172a] font-bold text-sm">₹ {subtotal}</span>
            </div>
            <div className="flex border-b border-[#cbd5e1] p-2">
              <span className="font-bold text-[#0f172a] flex-1 text-sm">GST (If Applicable)</span>
              <span className="text-[#0f172a] font-bold text-sm">₹ {((Math.max(0, subtotal - discount) * taxRate) / 100).toFixed(2)}</span>
            </div>
            <div className="flex p-2 bg-[#1e3a8a] text-white border border-[#1e3a8a]">
              <span className="font-bold flex-1 text-sm">Grand Total</span>
              <span className="font-bold text-sm">₹ {total}</span>
            </div>
          </div>
        </div>

        {/* Signatures & Thank you */}
        <div className="flex justify-between items-end mt-16 mb-6 px-4">
          <div className="text-center w-48">
            <div className="border-t border-dashed border-[#64748b] pt-2">
              <p className="text-xs font-bold text-[#1e3a8a]">Customer's Signature</p>
            </div>
          </div>
          <div className="text-center text-[#0ea5e9]">
            <h2 className="text-4xl italic" style={{ fontFamily: '"Brush Script MT", "Comic Sans MS", cursive' }}>Thank You!</h2>
            <p className="text-[10px] tracking-[0.25em] font-semibold text-[#1e3a8a] uppercase mt-1">For Your Business</p>
          </div>
          <div className="text-center w-48">
            <div className="border-t border-dashed border-[#64748b] pt-2">
              <p className="text-xs font-bold text-[#1e3a8a]">For, HydroCool Services</p>
              <p className="text-[10px] text-[#475569] font-medium mt-0.5">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#1e3a8a] text-white p-3 flex justify-between items-center mt-auto shrink-0 relative overflow-hidden">
        {/* Subtle background glow effect on right */}
        <div className="absolute right-0 top-0 w-64 h-full bg-[#0ea5e9] opacity-10 pointer-events-none" />
        
        <div className="flex gap-4 text-[9px] font-bold tracking-wider leading-tight">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7" /> RELIABLE<br/>SERVICE
          </div>
          <div className="flex items-center gap-2 border-l border-[#3b82f64d] pl-4">
            <Users className="w-7 h-7" /> EXPERT<br/>TECHNICIANS
          </div>
          <div className="flex items-center gap-2 border-l border-[#3b82f64d] pl-4">
            <ThumbsUp className="w-7 h-7" /> QUALITY<br/>WORK
          </div>
          <div className="flex items-center gap-2 border-l border-[#3b82f64d] pl-4">
            <CheckCircle className="w-7 h-7" /> CUSTOMER<br/>SATISFACTION
          </div>
        </div>
        
        <div className="text-right font-serif italic text-2xl text-[#0ea5e9] leading-tight pr-4 relative z-10" style={{ fontFamily: '"Brush Script MT", "Comic Sans MS", cursive' }}>
          Cooler Homes<br/>Happier Lives
          <div className="w-full h-1 bg-[#f97316] rounded-full mt-1 -rotate-2 transform origin-left" />
        </div>
      </div>
    </div>
  );
});

PDFDocument.displayName = "PDFDocument";
