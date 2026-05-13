"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Package, Truck, Search, Filter, Plus, X, ArrowRight } from "lucide-react";
import { createSalesOrder, updateOrderStatus } from '@/app/actions/orders';

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const [oRes, cRes, pRes] = await Promise.all([
      supabase.from('sales_orders').select('*, customers(name)').order('created_at', { ascending: false }),
      supabase.from('customers').select('*').order('name'),
      supabase.from('products').select('*').order('name')
    ]);
    
    setOrders(oRes.data || []);
    setCustomers(cRes.data || []);
    setProducts(pRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrder = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createSalesOrder(formData);
      setShowOrderModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvanceStatus = async (orderId: string, currentStatus: string) => {
    let newStatus = '';
    if (currentStatus === 'Pending') newStatus = 'Processing';
    else if (currentStatus === 'Processing') newStatus = 'Shipped';
    else return;

    if (newStatus === 'Shipped') {
      if (!confirm("Are you sure? This will deduct the items from your Finished Goods inventory permanently.")) return;
    }

    try {
      const formData = new FormData();
      formData.append('order_id', orderId);
      formData.append('status', newStatus);
      await updateOrderStatus(formData);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const shippedOrders = orders.filter(o => o.status === 'Shipped').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders & Fulfillment</h1>
          <p className="text-subtle mt-1">Track active orders and shipments</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
          <button onClick={() => setShowOrderModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New Order</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Pending</h3>
            <Package className="h-4 w-4 text-warning-color" />
          </div>
          <p className="text-2xl font-bold">{pendingOrders}</p>
        </div>
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Processing</h3>
            <Package className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{processingOrders}</p>
        </div>
        <div className="card border-success-color/30">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-success-color">Shipped</h3>
            <Truck className="h-4 w-4 text-success-color" />
          </div>
          <p className="text-2xl font-bold text-success-color">{shippedOrders}</p>
        </div>
      </div>

      <section className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Active Orders Pipeline</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input type="text" placeholder="Search orders..." className="pl-9 pr-3 py-1.5 bg-background border border-border-color rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent-color" />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color">
            <tr>
              <th className="px-4 py-3 font-medium">Order #</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium text-right">Fulfillment Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                <td className="px-4 py-3 font-medium group-hover:text-accent-color transition-colors">{o.order_number}</td>
                <td className="px-4 py-3 text-subtle">{o.customers?.name || 'Unknown'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                    ${o.status === 'Pending' ? 'bg-warning-color/10 text-warning-color' : ''}
                    ${o.status === 'Processing' ? 'bg-accent-color/10 text-accent-color' : ''}
                    ${o.status === 'Shipped' ? 'bg-success-color/10 text-success-color' : ''}
                    ${o.status === 'Cancelled' ? 'bg-black/10 dark:bg-white/10 text-subtle' : ''}
                  `}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">${Number(o.total_amount).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  {o.status === 'Pending' && (
                    <button onClick={() => handleAdvanceStatus(o.id, o.status)} className="text-xs bg-accent-color text-white px-3 py-1 rounded-full font-medium hover:bg-accent-color/90 flex items-center gap-1 ml-auto">
                      Start Picking <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {o.status === 'Processing' && (
                    <button onClick={() => handleAdvanceStatus(o.id, o.status)} className="text-xs bg-success-color text-white px-3 py-1 rounded-full font-medium hover:bg-success-color/90 flex items-center gap-1 ml-auto">
                      Mark as Shipped <Truck className="w-3 h-3" />
                    </button>
                  )}
                  {o.status === 'Shipped' && (
                    <span className="text-xs text-subtle">Fulfilled</span>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-subtle">No active orders found.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* NEW ORDER MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">New Sales Order</h2>
              <button onClick={() => setShowOrderModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer</label>
                <select name="customer_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Customer...</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product</label>
                <select name="product_id" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Select Finished Product...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} (Avail: {p.quantity_on_hand})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input type="number" name="quantity" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Sale Amount ($)</label>
                  <input type="number" step="0.01" name="total_amount" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary mt-4 py-2">
                {isSubmitting ? 'Creating Order...' : 'Submit Order'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
