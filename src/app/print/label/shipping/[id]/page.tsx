"use client";

import { useEffect, useState } from "react";
import { Package, Truck } from "lucide-react";

export default function ShippingLabelPrintPage({ params }: { params: { id: string } }) {
  const [labelUrl, setLabelUrl] = useState<string | null>(null);
  
  // In a real implementation, we would fetch the shipping_records row using params.id
  // and retrieve the ShipStation generated PDF base64 string or URL.
  
  useEffect(() => {
    // For now, this is a mock placeholder for the actual ShipStation PDF
    // setTimeout(() => window.print(), 1000);
  }, []);

  return (
    <div className="bg-white min-h-screen text-black flex flex-col items-center">
      {/* 
        This style block forces the browser's PDF engine to perfectly match
        the 4.25" width x 6" length of the iColor 250.
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
          <p className="font-bold">ShipStation Label Preview</p>
          <p className="text-sm text-zinc-400">Locked to 4" x 6"</p>
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
        className="relative bg-white text-black border-2 border-dashed border-gray-300 flex items-center justify-center flex-col"
        style={{ width: '4in', height: '6in', boxSizing: 'border-box', marginTop: '72px' }}
      >
        {labelUrl ? (
          <iframe src={labelUrl} className="w-full h-full border-none" title="Shipping Label" />
        ) : (
          <div className="text-center p-6 text-gray-500">
            <Truck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-bold text-black mb-2">ShipStation API</h2>
            <p className="text-sm">
              The live carrier PDF will render here natively in 4x6 format. 
            </p>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs font-mono">Order ID: {params.id}</p>
              <p className="text-xs font-mono mt-1">Status: Pending Carrier Generation</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
