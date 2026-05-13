import { createClient } from '@/lib/supabase/server';
import { Factory, FlaskConical, Beaker, ClipboardList, CheckCircle2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ManufacturingDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 1. Fetch Active Manufacturing Orders (Batch Records)
  const { data: batchRecords } = await supabase
    .from('manufacturing_orders')
    .select(`
      *,
      products (name, sku),
      bill_of_materials (name, version),
      supervisor:users (first_name, last_name)
    `)
    .neq('status', 'Completed')
    .order('created_at', { ascending: false });

  // 2. Fetch Bill of Materials (Recipes)
  const { data: boms } = await supabase
    .from('bill_of_materials')
    .select(`
      *,
      products (name)
    `)
    .eq('is_active', true);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Manufacturing & Batch Records</h1>
          <p className="text-sm text-subtle mt-1">Track WIP production runs and bill of materials.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-text-primary px-4 py-2 rounded-md text-sm font-medium transition-colors">
            New Recipe (BOM)
          </button>
          <button className="bg-accent-color hover:bg-accent-color/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            Start Batch Record
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Batch Records */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-background rounded-xl border border-border-color overflow-hidden">
            <div className="p-5 border-b border-border-color flex justify-between items-center bg-black/5 dark:bg-white/5">
              <h2 className="font-semibold text-text-primary flex items-center gap-2">
                <Factory className="w-4 h-4 text-accent-color" />
                Active Batch Records (WIP)
              </h2>
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-subtle uppercase bg-black/5 dark:bg-white/5 border-b border-border-color">
                  <tr>
                    <th className="px-6 py-4 font-medium">Batch #</th>
                    <th className="px-6 py-4 font-medium">Product / BOM</th>
                    <th className="px-6 py-4 font-medium">Stage</th>
                    <th className="px-6 py-4 font-medium">Target Qty</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {batchRecords && batchRecords.length > 0 ? (
                    batchRecords.map((batch) => (
                      <tr key={batch.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-medium text-text-primary">{batch.batch_number}</div>
                          <div className="text-xs text-subtle mt-1">{new Date(batch.start_date).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{batch.products?.name}</div>
                          <div className="text-xs text-subtle">{batch.bill_of_materials?.name} v{batch.bill_of_materials?.version}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            batch.status === 'Mixing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            batch.status === 'QA' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                            'bg-accent-color/10 text-accent-color'
                          }`}>
                            {batch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-text-primary">{batch.target_quantity}</div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-accent-color hover:underline font-medium text-xs">Update Record</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-subtle">
                        No active manufacturing orders.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recipes (BOMs) */}
        <div className="space-y-6">
          <div className="bg-background rounded-xl border border-border-color overflow-hidden">
            <div className="p-5 border-b border-border-color bg-black/5 dark:bg-white/5">
              <h2 className="font-semibold text-text-primary flex items-center gap-2">
                <Beaker className="w-4 h-4 text-accent-color" />
                Active Recipes (BOM)
              </h2>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-border-color">
                {boms && boms.length > 0 ? (
                  boms.map((bom) => (
                    <li key={bom.id} className="p-5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{bom.name}</p>
                          <p className="text-xs text-subtle mt-1">Output: {bom.products?.name}</p>
                        </div>
                        <span className="text-xs font-mono bg-black/5 dark:bg-white/10 px-2 py-1 rounded">v{bom.version}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-5 text-center text-sm text-subtle">
                    No active bill of materials.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
