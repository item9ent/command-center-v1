"use client";

import { useState } from "react";
import { Package, Truck, Printer, Search, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function FulfillmentDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Mock pending sales orders ready for shipment
  const mockPendingOrders = [
    {
      id: "ord-001",
      orderNumber: "SO-2026-1042",
      customer: "Apex Distribution",
      items: 3,
      status: "Ready for Label",
      requiresCoa: true,
      coaAttached: true
    },
    {
      id: "ord-002",
      orderNumber: "SO-2026-1045",
      customer: "Elevate Wellness",
      items: 1,
      status: "Ready for Label",
      requiresCoa: true,
      coaAttached: false
    }
  ];

  const handleGenerateLabel = async (orderId: string) => {
    setIsGenerating(true);
    // In a real implementation, this would call the server action createShipStationOrder
    setTimeout(() => {
      setIsGenerating(false);
      setSuccessMsg(`ShipStation Label Generated for Order ${orderId}`);
      setTimeout(() => setSuccessMsg(""), 3000);
    }, 1500);
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
          <p className="text-2xl font-bold text-text-primary mt-2">12</p>
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
              {mockPendingOrders.map((order) => (
                <tr key={order.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-text-primary">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-subtle">{order.customer}</td>
                  <td className="px-4 py-3 text-subtle">{order.items} items</td>
                  <td className="px-4 py-3">
                    {order.requiresCoa && !order.coaAttached ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-danger-color/10 text-danger-color border border-danger-color/20">
                        Missing COA
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Cleared
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link 
                      href={`/print/label/shipping/${order.id}`}
                      target="_blank"
                      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-subtle hover:text-text-primary transition-colors"
                      title="View Carrier Label"
                    >
                      <Printer className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleGenerateLabel(order.id)}
                      disabled={isGenerating || (order.requiresCoa && !order.coaAttached)}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-accent-color text-white hover:bg-accent-color/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                    >
                      {isGenerating ? "Connecting..." : "Generate ShipStation Label"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
