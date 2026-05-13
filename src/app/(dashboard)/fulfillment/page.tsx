"use client";

import { useState, useEffect } from "react";
import { Package, Truck, Printer, Search, CheckCircle2, AlertCircle, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { createBrowserClient } from '@supabase/ssr';
import { generateShippingLabel } from '@/app/actions/shipstation';

export default function FulfillmentDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [orders, setOrders] = useState<any[]>([]);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  // Shipping Params
  const [weight, setWeight] = useState(16);
  const [weightUnit, setWeightUnit] = useState<'ounces'|'grams'|'pounds'>('ounces');
  const [carrier, setCarrier] = useState('stamps_com'); // Default USPS via Stamps
  const [service, setService] = useState('usps_priority_mail');
  const [testMode, setTestMode] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('sales_orders')
      .select('*, customer:customers(name), line_items(*)')
      .in('status', ['Approved', 'Pending Fulfillment', 'Paid'])
      .order('created_at', { ascending: false });
      
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openShippingModal = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
    setErrorMsg("");
  };

  const handlePurchasePostage = async () => {
    if (!selectedOrder) return;
    setIsGenerating(true);
    setErrorMsg("");
    
    try {
      const res = await generateShippingLabel(
        selectedOrder.id,
        carrier,
        service,
        weight,
        weightUnit,
        testMode
      );

      if (!res.success) {
        throw new Error(res.error || "Failed to generate label");
      }

      setSuccessMsg(`Label Purchased! Tracking: ${res.trackingNumber || 'TEST'}`);
      
      // Auto-open PDF if returned
      if (res.labelData) {
        // Convert base64 PDF to blob and open in new tab
        const pdfWindow = window.open("");
        if (pdfWindow) {
          pdfWindow.document.write(
            `<iframe width='100%' height='100%' src='data:application/pdf;base64,${res.labelData}'></iframe>`
          );
          pdfWindow.document.title = `Shipping Label - ${selectedOrder.order_number}`;
        }
      }

      setShowModal(false);
      fetchData(); // Refresh list to remove shipped order
      setTimeout(() => setSuccessMsg(""), 5000);

    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Fulfillment & Shipping</h1>
        <p className="text-sm text-subtle mt-1">Manage carrier labels, packing slips, and compliance documents.</p>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-lg flex items-center gap-2 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-xl border border-border-color/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-subtle">Ready to Ship</h3>
            <Package className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold text-text-primary mt-2">{orders.length}</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-border-color/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-subtle">Labels Generated Today</h3>
            <Truck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-text-primary mt-2">45</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-border-color/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-subtle">Missing Documents</h3>
            <AlertCircle className="h-4 w-4 text-danger-color" />
          </div>
          <p className="text-2xl font-bold text-text-primary mt-2">3</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-xl border border-border-color/10 overflow-hidden">
        <div className="p-4 border-b border-border-color/10 flex items-center justify-between bg-black/20 dark:bg-white/5">
          <h2 className="text-lg font-medium text-text-primary">Pending Shipments</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-64 bg-black/5 dark:bg-white/5 border-none rounded-md py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-color"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-subtle uppercase bg-black/10 dark:bg-white/5 border-b border-border-color/10">
              <tr>
                <th className="px-4 py-3 font-medium">Order Number</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Compliance</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color/10">
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-subtle">Loading pending orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-subtle">No pending shipments!</td></tr>
              ) : orders.map((order) => {
                const totalItems = order.line_items?.length || 0;
                return (
                <tr key={order.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-text-primary">{order.order_number}</td>
                  <td className="px-4 py-3 text-subtle">{order.customer?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-subtle">{totalItems} items</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Cleared
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button 
                      onClick={() => openShippingModal(order)}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-accent-color text-white hover:bg-accent-color/90 transition-colors text-xs font-medium"
                    >
                      Buy Postage & Print
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* HEADLESS SHIPSTATION MODAL */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Purchase Shipping Label</h2>
              <button onClick={() => setShowModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg mb-4">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-border-color">
                <p className="text-xs text-subtle">Order</p>
                <p className="font-medium">{selectedOrder.order_number}</p>
                <p className="text-xs text-subtle mt-1">Ship To</p>
                <p className="font-medium truncate">{selectedOrder.customer?.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Weight</label>
                  <input 
                    type="number" 
                    value={weight} 
                    onChange={e => setWeight(Number(e.target.value))} 
                    className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unit</label>
                  <select 
                    value={weightUnit} 
                    onChange={(e: any) => setWeightUnit(e.target.value)} 
                    className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="ounces">Ounces (oz)</option>
                    <option value="pounds">Pounds (lb)</option>
                    <option value="grams">Grams (g)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Carrier</label>
                <select 
                  value={carrier} 
                  onChange={e => setCarrier(e.target.value)} 
                  className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-sm"
                >
                  <option value="stamps_com">USPS (via Stamps.com)</option>
                  <option value="ups">UPS</option>
                  <option value="fedex">FedEx</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Service Level</label>
                <select 
                  value={service} 
                  onChange={e => setService(e.target.value)} 
                  className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-sm"
                >
                  {carrier === 'stamps_com' && (
                    <>
                      <option value="usps_priority_mail">USPS Priority Mail</option>
                      <option value="usps_ground_advantage">USPS Ground Advantage</option>
                      <option value="usps_first_class_mail">USPS First Class Mail</option>
                    </>
                  )}
                  {carrier === 'ups' && (
                    <>
                      <option value="ups_ground">UPS Ground</option>
                      <option value="ups_next_day_air">UPS Next Day Air</option>
                    </>
                  )}
                  {carrier === 'fedex' && (
                    <>
                      <option value="fedex_ground">FedEx Ground</option>
                      <option value="fedex_2day">FedEx 2Day</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="testMode" 
                  checked={testMode} 
                  onChange={e => setTestMode(e.target.checked)} 
                  className="rounded border-border-color bg-background text-accent-color focus:ring-accent-color"
                />
                <label htmlFor="testMode" className="text-sm font-medium">Test Label (Do not charge billing account)</label>
              </div>

              <div className="pt-4 border-t border-border-color">
                <button 
                  onClick={handlePurchasePostage}
                  disabled={isGenerating} 
                  className="w-full btn btn-primary py-2.5 flex justify-center items-center gap-2"
                >
                  {isGenerating ? (
                    'Connecting to ShipStation...'
                  ) : (
                    <>
                      <Truck className="w-4 h-4" /> 
                      Purchase Postage & Generate 4x6 Label
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}    </div>
  );
}
