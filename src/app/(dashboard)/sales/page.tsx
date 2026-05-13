"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Users, FileText, ArrowUpRight, Plus, Filter, Search, X, Link } from "lucide-react";
import { createQuote } from '@/app/actions/crm-tasks';

export default function SalesDashboard() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const [cRes, qRes, pRes] = await Promise.all([
      supabase.from('customers').select('*').order('created_at', { ascending: false }),
      supabase.from('quotes').select('*, customers(name), line_items(quantity, products(name, sku, description, coa_url))').eq('status', 'Pending').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('name')
    ]);
    
    setCustomers(cRes.data || []);
    setQuotes(qRes.data || []);
    setProducts(pRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateQuote = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createQuote(formData);
      setShowQuoteModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales & Customers</h1>
          <p className="text-subtle mt-1">Manage accounts and track opportunities</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary border-border-color"><Filter className="w-4 h-4" /> Filter</button>
          <button onClick={() => setShowQuoteModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New Quote</button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Total Customers</h3>
            <Users className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Active Quotes</h3>
            <FileText className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{quotes.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Directory */}
        <section className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-border-color bg-black/5 dark:bg-white/5">
            <h2 className="text-lg font-semibold">Customer Directory</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
              <input type="text" placeholder="Search..." className="pl-9 pr-3 py-1.5 bg-background border border-border-color rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent-color" />
            </div>
          </div>
          
          <table className="w-full text-sm text-left">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-4 py-3 font-medium group-hover:text-accent-color transition-colors">{c.name}</td>
                  <td className="px-4 py-3 text-subtle">{c.type || c.customer_type || 'Unknown'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-accent-color/10 text-accent-color text-xs font-medium">
                      {c.sales_stage || c.status}
                    </span>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-subtle">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Pending Quotes */}
        <section className="card h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-color" />
              Recent Quotes
            </h2>
          </div>
          <div className="space-y-3">
            {quotes.map((quote) => {
              const lineItem = quote.line_items?.[0];
              const product = lineItem?.products;
              return (
              <div key={quote.id} className="p-3 rounded-lg border border-border-color bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{quote.quote_number}</span>
                  <span className="text-xs font-medium text-accent-color">${Number(quote.total_amount).toLocaleString()}</span>
                </div>
                <p className="text-xs text-subtle mb-2">{quote.customers?.name || 'Unknown Customer'}</p>
                
                {product && (
                  <div className="pt-2 border-t border-border-color/50">
                    <p className="text-xs font-medium">{lineItem.quantity}x {product.name} <span className="text-subtle">({product.sku})</span></p>
                    {product.description && <p className="text-[10px] text-subtle mt-0.5 line-clamp-1">{product.description}</p>}
                    {product.coa_url && (
                      <a href={product.coa_url} target="_blank" rel="noreferrer" className="text-[10px] text-accent-color hover:underline flex items-center gap-1 mt-1">
                        <Link className="w-3 h-3" /> View COA
                      </a>
                    )}
                  </div>
                )}
                
                <div className="mt-3 flex justify-end">
                  <a 
                    href={`/print/quote/${quote.id}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-medium text-accent-color hover:underline"
                  >
                    Download PDF →
                  </a>
                </div>
              </div>
            )})}
            {quotes.length === 0 && (
              <div className="text-center p-6 text-subtle text-sm border border-dashed border-border-color rounded-lg">No active quotes!</div>
            )}
          </div>
        </section>
      </div>

      {/* NEW QUOTE MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Generate New Quote</h2>
              <button onClick={() => setShowQuoteModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleCreateQuote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer</label>
                <select name="customer_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Customer...</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="border-t border-border-color pt-4 mt-2">
                <label className="block text-sm font-medium mb-1">Product</label>
                <select name="product_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Product...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input type="number" min="1" name="quantity" defaultValue="1" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Quote Amount ($)</label>
                  <input type="number" step="0.01" name="total_amount" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
              </div>
              <p className="text-xs text-subtle mt-2">
                Product COA and details will automatically be attached to the quote record if they exist in Master Data.
              </p>
              <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary mt-4 py-2">
                {isSubmitting ? 'Generating...' : 'Generate Quote'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
