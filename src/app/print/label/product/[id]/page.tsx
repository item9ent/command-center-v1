"use client";

import { useEffect } from "react";
import { QrCode, Beaker, ShieldAlert, Calendar } from "lucide-react";

export default function ProductLabelPrintPage({ params }: { params: { id: string } }) {
  // In a real implementation, we would fetch the Product + WIP Inventory Batch using params.id
  // For the MVP preview, we will use mock data perfectly sized for the 4x6 label.
  
  useEffect(() => {
    // Automatically open the print dialog when the page loads
    // setTimeout(() => window.print(), 1000);
  }, []);

  return (
    <div className="bg-white min-h-screen text-black flex justify-center items-start pt-16">
      {/* 
        This style block forces the browser's PDF engine to perfectly match
        the 4" width x 2" height for Product Labels.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @page {
          size: 4in 2in;
          margin: 0;
        }
        @media print {
          html, body {
            width: 4in;
            height: 2in;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />

      {/* Development Preview Helper */}
      <div className="no-print bg-zinc-900 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
        <div>
          <p className="font-bold">Product Label Preview</p>
          <p className="text-sm text-zinc-400">Dimensions locked to 4" x 2"</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-white text-black px-4 py-2 rounded font-medium"
        >
          Print Label
        </button>
      </div>

      {/* The Actual 4x2 Label Canvas */}
      <div 
        className="relative bg-white text-black overflow-hidden flex"
        style={{ width: '4in', height: '2in', padding: '0.1in', boxSizing: 'border-box' }}
      >
        {/* Left Side: Product Details */}
        <div className="flex-1 flex flex-col justify-between pr-2">
          
          {/* Header */}
          <div className="border-b border-black pb-0.5 mb-1">
            <h1 className="text-lg font-black uppercase tracking-tighter leading-none">Premium Isolate</h1>
            <p className="text-[10px] font-bold font-mono">SKU: ISO-99-ORG</p>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
            <div>
              <p className="text-[8px] font-bold uppercase text-gray-500 leading-none">Batch No.</p>
              <p className="font-mono text-[10px] font-bold leading-tight">B-2026-0042</p>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase text-gray-500 leading-none">Expiration</p>
              <p className="font-mono text-[10px] font-bold leading-tight">12/2027</p>
            </div>
            <div className="col-span-2">
              <p className="text-[8px] font-bold uppercase text-gray-500 leading-none">Net Weight</p>
              <p className="font-mono text-sm font-black leading-tight">1.0 KG</p>
            </div>
          </div>

          {/* Warnings / Footer */}
          <div className="mt-auto">
            <p className="text-[6px] leading-tight font-medium text-justify">
              Keep out of reach of children. Store in a cool, dry place away from direct sunlight. 
              Manufactured in a facility that processes hemp derivatives.
            </p>
            <div className="text-[6px] font-bold tracking-widest uppercase mt-0.5">
              ENHAZED OS • COMMAND CENTER LABS
            </div>
          </div>

        </div>

        {/* Right Side: QR Code (COA) */}
        <div className="w-[1in] border-l-2 border-black pl-2 flex flex-col items-center justify-center shrink-0">
          <div className="w-[0.8in] h-[0.8in] bg-black flex items-center justify-center rounded">
            <QrCode className="w-[0.6in] h-[0.6in] text-white" />
          </div>
          <p className="text-[8px] font-bold mt-1 text-center uppercase leading-tight">Scan for<br/>COA</p>
        </div>

      </div>
    </div>
  );
}
