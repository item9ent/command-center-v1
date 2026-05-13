"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Factory, Wind, Package, CheckCircle2, ChevronRight, Loader2, Beaker, Play } from 'lucide-react';
import { submitMixingData, submitDryingData, submitGrindingData } from '@/app/actions/workstation';

export default function WorkstationDashboard() {
  const [activeRole, setActiveRole] = useState<'Mixing' | 'Drying' | 'Grinding'>('Mixing');
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ebrStep, setEbrStep] = useState(1);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchBatches();
  }, [activeRole]);

  const fetchBatches = async () => {
    setLoading(true);
    setSelectedBatch(null);
    setEbrStep(1);
    
    let query = supabase
      .from('manufacturing_orders')
      .select('*, products(name, sku)')
      .order('created_at', { ascending: false });
      
    if (activeRole === 'Mixing') {
      query = query.eq('status', 'Mixing');
    } else if (activeRole === 'Drying') {
      query = query.eq('status', 'Processing').gt('wet_mix_available_qty', 0);
    } else if (activeRole === 'Grinding') {
      query = query.eq('status', 'Processing').gt('dry_material_available_qty', 0);
    }

    const { data } = await query;
    setBatches(data || []);
    setLoading(false);
  };

  const handleAction = async (action: Function, formData: FormData) => {
    setIsSubmitting(true);
    try {
      formData.append('batch_id', selectedBatch.id);
      await action(formData);
      alert('Batch processed successfully!');
      fetchBatches();
    } catch (err: any) {
      alert(`Error processing batch: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Role Selector Header */}
      <div className="bg-card-bg border border-border-color rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Factory className="w-6 h-6 text-accent-color" />
            My Workstation
          </h1>
          <p className="text-sm text-subtle">Select your current station to view queued batches.</p>
        </div>
        
        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg">
          <button 
            onClick={() => setActiveRole('Mixing')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeRole === 'Mixing' ? 'bg-accent-color text-white shadow-sm' : 'text-subtle hover:text-primary'}`}
          >
            1. Mixing
          </button>
          <button 
            onClick={() => setActiveRole('Drying')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeRole === 'Drying' ? 'bg-accent-color text-white shadow-sm' : 'text-subtle hover:text-primary'}`}
          >
            2. Drying
          </button>
          <button 
            onClick={() => setActiveRole('Grinding')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeRole === 'Grinding' ? 'bg-accent-color text-white shadow-sm' : 'text-subtle hover:text-primary'}`}
          >
            3. Grinding & Pkg
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Queue */}
        <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden h-[600px] flex flex-col">
          <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-primary">Queue: {activeRole}</h3>
            <span className="text-xs bg-accent-color/10 text-accent-color px-2 py-1 rounded-full">{batches.length} Pending</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 text-accent-color animate-spin" /></div>
            ) : batches.length === 0 ? (
              <div className="text-center p-8 text-subtle text-sm">No batches in queue for this station.</div>
            ) : (
              batches.map(batch => (
                <div 
                  key={batch.id} 
                  onClick={() => { setSelectedBatch(batch); setEbrStep(1); }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedBatch?.id === batch.id ? 'border-accent-color bg-accent-color/5' : 'border-border-color hover:border-accent-color/50'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-primary">{batch.batch_number}</span>
                  </div>
                  <div className="text-xs text-subtle font-medium truncate mb-2">{batch.products?.name}</div>
                  
                  {activeRole === 'Mixing' && (
                    <div className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded inline-block">Target: {batch.target_quantity}</div>
                  )}
                  {activeRole === 'Drying' && (
                    <div className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded inline-block">WIP: {batch.wet_mix_available_qty}kg Wet Mix</div>
                  )}
                  {activeRole === 'Grinding' && (
                    <div className="text-xs bg-orange-500/10 text-orange-500 px-2 py-1 rounded inline-block">WIP: {batch.dry_material_available_qty}kg Dry Material</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Execution Portal */}
        <div className="lg:col-span-2">
          {!selectedBatch ? (
            <div className="h-[600px] border border-border-color border-dashed rounded-xl flex flex-col items-center justify-center text-subtle bg-black/5 dark:bg-white/5">
              <Play className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a batch from the queue to start working.</p>
            </div>
          ) : (
            <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden h-[600px] flex flex-col shadow-lg shadow-accent-color/5">
              
              <div className="p-6 border-b border-border-color bg-gradient-to-r from-accent-color/10 to-transparent">
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2 py-1 bg-accent-color text-white text-xs font-bold rounded">{activeRole} Phase</span>
                  <span className="text-sm font-mono text-subtle">{selectedBatch.batch_number}</span>
                </div>
                <h2 className="text-2xl font-bold text-primary">{selectedBatch.products?.name}</h2>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                
                {/* MIXING EBR WIZARD */}
                {activeRole === 'Mixing' && (
                  <form action={(fd) => handleAction(submitMixingData, fd)} className="space-y-6 max-w-lg mx-auto">
                    
                    {ebrStep === 1 && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                          <h4 className="font-bold text-blue-500 flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5"/> Step 1: Prep & Calibration</h4>
                          <p className="text-sm text-subtle mb-4">Ensure the mixing vat is thoroughly sanitized according to SOP-001. Verify scale calibration.</p>
                          <label className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                            <input type="checkbox" required className="w-5 h-5 accent-accent-color" />
                            <span className="text-sm font-medium">I verify equipment is prepped.</span>
                          </label>
                        </div>
                        <button type="button" onClick={() => setEbrStep(2)} className="w-full py-3 bg-accent-color text-white rounded-lg font-bold">Next Step</button>
                      </div>
                    )}

                    {ebrStep === 2 && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                          <h4 className="font-bold text-purple-500 flex items-center gap-2 mb-2"><Beaker className="w-5 h-5"/> Step 2: Formulation Addition</h4>
                          <p className="text-sm text-subtle mb-4">Input the EXACT actual quantities added to the mixer. Do not guess.</p>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-medium text-subtle mb-1">Raw Biomass / Extract Added (kg)</label>
                              <input required name="ing_a" type="number" step="0.1" placeholder="Target: 50kg" className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-primary focus:border-purple-500 outline-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-subtle mb-1">Solvent Volume Added (Liters)</label>
                              <input required name="ing_b" type="number" step="0.1" placeholder="Target: 10L" className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-primary focus:border-purple-500 outline-none" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setEbrStep(1)} className="px-4 py-3 border border-border-color rounded-lg font-bold">Back</button>
                          <button type="button" onClick={() => setEbrStep(3)} className="flex-1 py-3 bg-accent-color text-white rounded-lg font-bold">Next Step</button>
                        </div>
                      </div>
                    )}

                    {ebrStep === 3 && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                          <h4 className="font-bold text-green-500 flex items-center gap-2 mb-2"><Factory className="w-5 h-5"/> Step 3: Mixing Execution</h4>
                          
                          <div className="space-y-4 mb-4">
                            <div>
                              <label className="block text-xs font-medium text-subtle mb-1">Actual RPM Setting</label>
                              <input required name="rpm" type="number" placeholder="Target: 500 RPM" className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-primary focus:border-green-500 outline-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-subtle mb-1">Total Mixing Time (Minutes)</label>
                              <input required name="time" type="number" placeholder="Target: 45 mins" className="w-full bg-background border border-border-color rounded-lg px-3 py-2 text-primary focus:border-green-500 outline-none" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setEbrStep(2)} className="px-4 py-3 border border-border-color rounded-lg font-bold">Back</button>
                          <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold flex justify-center items-center gap-2 disabled:opacity-50">
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                            Complete Mixing Phase
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* DRYING FORM */}
                {activeRole === 'Drying' && (
                  <form action={(fd) => handleAction(submitDryingData, fd)} className="space-y-6 max-w-lg mx-auto animate-in fade-in">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl space-y-4">
                      <h4 className="font-bold text-yellow-500 flex items-center gap-2 mb-2"><Wind className="w-6 h-6"/> Yield Tracking</h4>
                      <p className="text-sm text-subtle mb-4">Record the wet weight placed into the oven, and the final dry weight pulled out to calculate the yield loss.</p>
                      
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Wet Weight In (kg)</label>
                        <input required name="wet_in" type="number" step="0.01" className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-lg font-mono focus:border-yellow-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Dry Weight Out (kg)</label>
                        <input required name="dry_out" type="number" step="0.01" className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-lg font-mono focus:border-yellow-500 outline-none" />
                      </div>
                      
                      <button type="submit" disabled={isSubmitting} className="w-full mt-4 py-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold flex justify-center items-center gap-2 disabled:opacity-50">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        Submit Yield & Send to Grinder
                      </button>
                    </div>
                  </form>
                )}

                {/* GRINDING & PACKAGING FORM */}
                {activeRole === 'Grinding' && (
                  <form action={(fd) => handleAction(submitGrindingData, fd)} className="space-y-6 max-w-lg mx-auto animate-in fade-in">
                    <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-xl space-y-4">
                      <h4 className="font-bold text-orange-500 flex items-center gap-2 mb-2"><Package className="w-6 h-6"/> Final Packaging</h4>
                      <p className="text-sm text-subtle mb-4">You have <strong>{selectedBatch.dry_material_available_qty}kg</strong> of dry material available. Pull what you need, grind it, and record the finished SKUs.</p>
                      
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Dry Material Pulled from WIP (kg)</label>
                        <input required name="dry_in" type="number" step="0.01" max={selectedBatch.dry_material_available_qty} className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-lg font-mono focus:border-orange-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Total Finished Powder Weight Out (kg/lbs)</label>
                        <input required name="powder_weight" type="number" step="0.01" className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-lg font-mono focus:border-orange-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Total Finished SKUs Completed</label>
                        <input required name="skus_qty" type="number" className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-lg font-mono focus:border-orange-500 outline-none" />
                      </div>
                      
                      <button type="submit" disabled={isSubmitting} className="w-full mt-4 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold flex justify-center items-center gap-2 disabled:opacity-50">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        Complete Batch Run
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
