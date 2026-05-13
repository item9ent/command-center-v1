"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Printer } from 'lucide-react';
import { use } from 'react';

export default function QuotePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchQuote = async () => {
      const { data } = await supabase
        .from('quotes')
        .select(`
          *,
          customers (*),
          line_items (
            quantity,
            total_price,
            products (name, sku, description)
          )
        `)
        .eq('id', resolvedParams.id)
        .single();
      
      setQuote(data);
      setLoading(false);
      
      // Auto trigger print dialogue after rendering
      if (data) {
        setTimeout(() => window.print(), 500);
      }
    };
    fetchQuote();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Generating Document...</div>;
  if (!quote) return <div className="p-10 text-center text-red-500">Quote not found.</div>;

  return (
    <div className="bg-white text-black font-sans">
      <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8 mt-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">ENHAZED</h1>
          <p className="text-sm font-medium mt-1 text-gray-600">Advanced Manufacturing</p>
          <div className="mt-4 text-sm text-gray-600">
            <p>123 Industrial Parkway</p>
            <p>Suite 100</p>
            <p>manufacturing@enhazed.com</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-light text-gray-400 uppercase tracking-widest">Quote</h2>
          <div className="mt-4 flex flex-col items-end gap-1 text-sm">
            <div className="flex justify-between w-48 border-b border-gray-200 pb-1">
              <span className="font-semibold text-gray-500">Date:</span>
              <span>{new Date(quote.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between w-48 border-b border-gray-200 pb-1">
              <span className="font-semibold text-gray-500">Quote #:</span>
              <span className="font-bold">{quote.quote_number}</span>
            </div>
            <div className="flex justify-between w-48 pb-1">
              <span className="font-semibold text-gray-500">Valid Until:</span>
              <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-2 border-b border-gray-200 pb-1">Prepared For</h3>
        <p className="font-bold text-lg">{quote.customers?.name}</p>
        {quote.customers?.address && <p className="text-sm text-gray-600">{quote.customers.address}</p>}
        {quote.customers?.email && <p className="text-sm text-gray-600">{quote.customers.email}</p>}
        {quote.customers?.phone && <p className="text-sm text-gray-600">{quote.customers.phone}</p>}
      </div>

      <table className="w-full text-left border-collapse mb-8">
        <thead>
          <tr className="bg-gray-100 border-y-2 border-black">
            <th className="py-3 px-4 text-sm font-bold uppercase text-gray-600 w-16">Qty</th>
            <th className="py-3 px-4 text-sm font-bold uppercase text-gray-600">Description</th>
            <th className="py-3 px-4 text-sm font-bold uppercase text-gray-600 text-right w-32">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {quote.line_items?.map((item: any, idx: number) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="py-4 px-4 align-top font-medium">{item.quantity}</td>
              <td className="py-4 px-4 align-top">
                <p className="font-bold">{item.products?.name}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">SKU: {item.products?.sku}</p>
                {item.products?.description && (
                  <p className="text-sm text-gray-600 mt-2">{item.products?.description}</p>
                )}
              </td>
              <td className="py-4 px-4 align-top text-right font-medium">${Number(item.total_price).toLocaleString()}</td>
            </tr>
          ))}
          {(!quote.line_items || quote.line_items.length === 0) && (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500 italic">No line items specified.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end mb-16">
        <div className="w-64 border-t-2 border-black pt-2">
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>${Number(quote.total_amount).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
        <p className="font-bold text-gray-700 mb-1">Terms & Conditions</p>
        <p>This quote is valid for 30 days from the date of issue. Prices and availability are subject to change. To accept this quote, please sign below and return.</p>
      </div>

      <div className="mt-16 pt-8 flex justify-between gap-8">
        <div className="flex-1 border-t border-black pt-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Authorized Signature</p>
        </div>
        <div className="w-48 border-t border-black pt-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Date</p>
        </div>
      </div>

      {/* Floating Action Button (Hidden on Print) */}
      <div className="fixed bottom-8 right-8 no-print">
        <button 
          onClick={() => window.print()} 
          className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full font-medium shadow-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          <Printer className="w-5 h-5" />
          Print PDF
        </button>
      </div>
    </div>
  );
}
