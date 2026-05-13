"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { ShieldAlert, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { approveRequest, rejectRequest } from '@/app/actions/approvals';

export default function AlertsDashboard() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const [apRes, alRes] = await Promise.all([
      supabase.from('approval_requests').select('*').eq('status', 'Pending'),
      supabase.from('alerts').select('*').eq('status', 'Active').order('created_at', { ascending: false })
    ]);
    
    setApprovals(apRes.data || []);
    setAlerts(alRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id: string, type: string, recordId: string) => {
    const formData = new FormData();
    formData.append('request_id', id);
    formData.append('record_type', type);
    formData.append('record_id', recordId);
    
    try {
      await approveRequest(formData);
      fetchData();
    } catch (err: any) {
      alert(`Error approving: ${err.message}`);
    }
  };

  const handleReject = async (id: string, type: string, recordId: string) => {
    const formData = new FormData();
    formData.append('request_id', id);
    formData.append('record_type', type);
    formData.append('record_id', recordId);
    
    try {
      await rejectRequest(formData);
      fetchData();
    } catch (err: any) {
      alert(`Error rejecting: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Approvals</h1>
          <p className="text-subtle mt-1">Review critical exceptions and pending requests</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Approvals Queue */}
        <section className="card border-accent-color/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-accent-color" />
              Approval Queue
            </h2>
            <span className="bg-accent-color/10 text-accent-color px-2 py-0.5 rounded-full text-xs font-semibold">
              {approvals.length} Pending
            </span>
          </div>
          
          <div className="space-y-4">
            {approvals.map((req) => (
              <div key={req.id} className="p-4 border border-border-color rounded-lg bg-black/5 dark:bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{req.type}</h3>
                  <span className="text-xs text-subtle truncate max-w-[100px]" title={req.id}>{req.id.substring(0,8)}...</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div><span className="text-subtle">Value:</span> ${Number(req.amount).toLocaleString() || 0}</div>
                  <div className="col-span-2"><span className="text-subtle">Justification:</span> <span className="text-warning-color font-medium">{req.justification || 'None provided'}</span></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(req.id, req.related_record_type, req.related_record_id)} className="flex-1 btn btn-primary py-1.5 text-xs">
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                  </button>
                  <button onClick={() => handleReject(req.id, req.related_record_type, req.related_record_id)} className="flex-1 btn btn-secondary py-1.5 text-xs">
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </button>
                </div>
              </div>
            ))}
            {approvals.length === 0 && (
              <div className="text-center p-6 text-subtle text-sm">No pending approvals!</div>
            )}
          </div>
        </section>

        {/* System Alerts */}
        <section className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning-color" />
              System Alerts
            </h2>
            <button className="text-accent-color text-sm hover:underline">Dismiss All</button>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${alert.is_urgent ? 'border-danger-color bg-danger-color/5' : 'border-warning-color bg-warning-color/5'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-xs font-semibold ${alert.is_urgent ? 'text-danger-color' : 'text-warning-color'}`}>{alert.type}</span>
                  <span className="text-xs text-subtle">{new Date(alert.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm">{alert.message}</p>
                <div className="mt-2 text-right flex gap-3 justify-end">
                  <button className="text-xs font-medium text-subtle hover:text-text-primary">Dismiss</button>
                  <button className="text-xs font-medium text-accent-color hover:underline">Create Task</button>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center p-6 text-subtle text-sm">No active alerts!</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
