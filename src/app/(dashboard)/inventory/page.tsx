"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Box, ShoppingCart, AlertTriangle, Plus, Search, X, Check, Printer } from "lucide-react";
import { createPurchaseOrder, receivePurchaseOrder } from '@/app/actions/inventory';

export default function InventoryDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal States
  const [showPOModal, setShowPOModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const [pRes, mRes, poRes, vRes] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('materials').select('*').order('name'),
      supabase.from('purchase_orders').select('*, vendors(name)').order('created_at', { ascending: false }),
      supabase.from('vendors').select('*').order('name')
    ]);
    
    setProducts(pRes.data || []);
    setMaterials(mRes.data || []);
    setPurchaseOrders(poRes.data || []);
    setVendors(vRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePO = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createPurchaseOrder(formData);
      setShowPOModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReceivePO = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await receivePurchaseOrder(formData);
      setShowReceiveModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory & Purchasing</h1>
          <p className="text-subtle mt-1">Manage Raw Materials and Finished Goods</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowReceiveModal(true)} className="btn btn-secondary border-border-color">Receive Items</button>
          <button onClick={() => setShowPOModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New PO</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card border-warning-color/30 bg-warning-color/5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-warning-color">Low Stock Items</h3>
            <AlertTriangle className="h-4 w-4 text-warning-color" />
          </div>
          <p className="text-2xl font-bold text-warning-color">
            {materials.filter(m => m.quantity_on_hand <= (m.reorder_point || 0)).length}
          </p>
        </div>
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Incoming (POs)</h3>
            <ShoppingCart className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{purchaseOrders.filter(p => p.status === 'Submitted' || p.status === 'Approved').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 space-y-6">
          {/* Raw Materials */}
          <div className="card p-0 overflow-hidden">
            <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-500" />
                Raw Materials
              </h2>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color text-xs uppercase text-subtle">
                <tr>
                  <th className="px-4 py-3 font-medium">Material Name</th>
                  <th className="px-4 py-3 font-medium">On Hand</th>
                  <th className="px-4 py-3 font-medium">Reorder Pt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {materials.map((row) => (
                  <tr key={row.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-4 py-3 font-medium group-hover:text-blue-500 transition-colors">{row.name}</td>
                    <td className="px-4 py-3 font-bold">{row.quantity_on_hand || 0} {row.unit_of_measure}</td>
                    <td className="px-4 py-3 text-subtle">{row.reorder_point || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Finished Goods */}
          <div className="card p-0 overflow-hidden">
            <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Box className="w-4 h-4 text-accent-color" />
                Finished Goods (Products)
              </h2>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color text-xs uppercase text-subtle">
                <tr>
                  <th className="px-4 py-3 font-medium">Product Name</th>
                  <th className="px-4 py-3 font-medium">On Hand</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {products.map((row) => (
                  <tr key={row.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-4 py-3 font-medium group-hover:text-accent-color transition-colors">{row.name}</td>
                    <td className="px-4 py-3 font-bold">{row.quantity_on_hand || 0} units</td>
                    <td className="px-4 py-3 font-medium">${Number(row.sale_price).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <a 
                        href={`/print/label/product/${row.id}`} 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-subtle hover:text-text-primary transition-colors"
                        title="Print 4x2 Product Label"
                      >
                        <Printer className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Active POs */}
        <section className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-accent-color" />
              Purchase Orders
            </h2>
          </div>
          <div className="space-y-3">
            {purchaseOrders.map((po) => (
              <div key={po.id} className="p-3 rounded-lg border border-border-color bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{po.po_number}</span>
                  <span className="text-xs font-medium text-accent-color">${Number(po.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-subtle">{po.vendors?.name || 'Unknown Vendor'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${po.status === 'Received' ? 'bg-green-500/10 text-green-500' : 'bg-black/5 dark:bg-white/10'}`}>{po.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NEW PO MODAL */}
      {showPOModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Purchase Order</h2>
              <button onClick={() => setShowPOModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleCreatePO} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vendor</label>
                <select name="vendor_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Vendor...</option>
                  {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Material to Order</label>
                <select name="material_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Material...</option>
                  {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input type="number" name="quantity" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Cost ($)</label>
                  <input type="number" step="0.01" name="total_amount" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary mt-4 py-2">
                {isSubmitting ? 'Creating...' : 'Submit PO'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RECEIVE ITEMS MODAL */}
      {showReceiveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Receive PO</h2>
              <button onClick={() => setShowReceiveModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleReceivePO} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Incoming PO</label>
                <select name="po_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select PO...</option>
                  {purchaseOrders.filter(p => p.status !== 'Received').map(p => (
                    <option key={p.id} value={p.id}>{p.po_number} - {p.vendors?.name}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-subtle">Receiving this PO will automatically update your Raw Material stock levels.</p>
              <button type="submit" disabled={isSubmitting} className="w-full btn bg-green-600 hover:bg-green-500 text-white mt-4 py-2">
                {isSubmitting ? 'Receiving...' : 'Mark as Received'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
