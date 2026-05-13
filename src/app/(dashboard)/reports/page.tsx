"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { BarChart3, TrendingUp, DollarSign, Activity, Users, ShoppingCart } from "lucide-react";

export default function ReportsDashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [salesRes, purchasesRes, tasksRes] = await Promise.all([
        supabase.from('sales_orders').select('total_amount'),
        supabase.from('purchase_orders').select('total_amount'),
        supabase.from('tasks').select('status')
      ]);

      const salesAmount = (salesRes.data || []).reduce((acc, curr) => acc + Number(curr.total_amount || 0), 0);
      const purchasesAmount = (purchasesRes.data || []).reduce((acc, curr) => acc + Number(curr.total_amount || 0), 0);
      
      const tasks = tasksRes.data || [];
      const completedTasks = tasks.filter(t => t.status === 'Completed').length;
      const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

      setTotalSales(salesAmount);
      setTotalPurchases(purchasesAmount);
      setTaskCompletionRate(completionRate);
      setLoading(false);
    };

    fetchData();
  }, []);

  const grossMargin = totalSales > 0 ? Math.round(((totalSales - totalPurchases) / totalSales) * 100) : 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Management Reports</h1>
          <p className="text-subtle mt-1">Live KPIs and financial aggregates</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary border-border-color">Export PDF</button>
        </div>
      </header>

      {/* Financial Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-success-color/5 to-transparent border-success-color/20">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-success-color">Total Sales Volume</h3>
            <TrendingUp className="h-4 w-4 text-success-color" />
          </div>
          <p className="text-3xl font-bold">${totalSales.toLocaleString()}</p>
          <p className="text-xs text-subtle mt-2">All time</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Total Purchase Volume</h3>
            <ShoppingCart className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-3xl font-bold">${totalPurchases.toLocaleString()}</p>
          <p className="text-xs text-subtle mt-2">All time</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Gross Margin (Est)</h3>
            <DollarSign className="h-4 w-4 text-success-color" />
          </div>
          <p className="text-3xl font-bold">
            {grossMargin}%
          </p>
          <p className="text-xs text-subtle mt-2">Target: 40%</p>
        </div>
      </section>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent-color" />
              Revenue by Month
            </h2>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {/* CSS Bar Chart Placeholder */}
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div key={i} className="w-full flex flex-col justify-end items-center group">
                <div 
                  className="w-full bg-accent-color/20 group-hover:bg-accent-color/80 transition-all rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-subtle mt-2">M{i+1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-warning-color" />
              Task Completion Rate
            </h2>
          </div>
          <div className="flex items-center justify-center h-64">
             <div className="relative w-48 h-48 rounded-full border-[16px] border-black/5 dark:border-white/5 border-t-accent-color border-r-accent-color flex items-center justify-center rotate-45">
               <div className="absolute -rotate-45 text-center">
                 <span className="text-3xl font-bold">{taskCompletionRate}%</span>
                 <p className="text-xs text-subtle mt-1">Completed</p>
               </div>
             </div>
          </div>
        </section>
      </div>

    </div>
  );
}
