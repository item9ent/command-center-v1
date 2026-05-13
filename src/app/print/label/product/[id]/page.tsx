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
    <div className="bg-white min-h-screen text-black">
      {/* 
        This style block forces the browser's PDF engine to perfectly match
        the 4.25" width x 6" length of the iColor 250. 
        We use 4in x 6in as a safe standard that fits within the printable area.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @page {
          size: 4in 6in;
          margin: 0;
        }
        @media print {
          html, body {
            width: 4in;
            height: 6in;
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
          <p className="font-bold">iColor 250 Preview</p>
          <p className="text-sm text-zinc-400">Dimensions locked to 4" x 6"</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-white text-black px-4 py-2 rounded font-medium"
        >
          Print Label
        </button>
      </div>

      {/* The Actual 4x6 Label Canvas */}
      <div 
        className="relative bg-white text-black overflow-hidden"
        style={{ width: '4in', height: '6in', padding: '0.25in', boxSizing: 'border-box', marginTop: '72px' }}
      >
        <div className="absolute inset-0 border-4 border-black m-2 rounded-xl pointer-events-none"></div>

        {/* Header */}
        <div className="mt-4 border-b-2 border-black pb-2 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Premium Isolate</h1>
          <p className="text-lg font-bold font-mono">SKU: ISO-99-ORG</p>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1 flex items-center gap-1">
                <Beaker className="w-3 h-3"/> Batch No.
              </p>
              <p className="font-mono text-xl font-bold">B-2026-0042</p>
            </div>
            
            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3"/> Expiration
              </p>
              <p className="font-mono text-xl font-bold">12/2027</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">Net Weight</p>
              <p className="font-mono text-2xl font-black">1.0 KG</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-black pl-4">
            {/* Mock QR Code linking to COA */}
            <div className="w-24 h-24 bg-black flex items-center justify-center rounded">
              <QrCode className="w-16 h-16 text-white" />
            </div>
            <p className="text-xs font-bold mt-2 text-center uppercase">Scan for COA</p>
          </div>
        </div>

        {/* Warnings / Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-start gap-2 bg-black text-white p-2 rounded">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <p className="text-[10px] leading-tight font-medium">
              Keep out of reach of children. Store in a cool, dry place away from direct sunlight. 
              Manufactured in a facility that processes hemp derivatives.
            </p>
          </div>
          <div className="text-center mt-2 text-[9px] font-bold tracking-widest uppercase">
            ENHAZED OS • COMMAND CENTER LABS
          </div>
        </div>
      </div>

    </div>
  );
}
