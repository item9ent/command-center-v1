"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Ensure the user's company ID is automatically injected
async function getAuthContext(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data: userRecord } = await supabase
    .from('users')
    .select('company_id')
    .eq('id', user.id)
    .single();
    
  const { data: employee } = await supabase
    .from('employees')
    .select('id')
    .eq('user_id', user.id)
    .single();
    
  return { companyId: userRecord?.company_id, employeeId: employee?.id, userId: user.id };
}

export async function submitMixingData(formData: FormData) {
  const supabase = await getSupabase();
  const { companyId, employeeId } = await getAuthContext(supabase);
  const batchId = formData.get('batch_id') as string;
  
  const ingA = parseFloat(formData.get('ing_a') as string) || 0;
  const ingB = parseFloat(formData.get('ing_b') as string) || 0;
  const wetMixGenerated = ingA + ingB; // Simple estimate for total wet mix yield
  
  // Create Log
  await supabase.from('batch_production_logs').insert({
    company_id: companyId,
    manufacturing_order_id: batchId,
    employee_id: employeeId,
    stage: 'Mixing',
    step_name: 'EBR Wizard Completed',
    metric_data: {
      ingredient_a_qty: ingA,
      ingredient_b_qty: ingB,
      mixing_time_mins: formData.get('time'),
      rpm: formData.get('rpm'),
      wet_mix_yield_kg: wetMixGenerated
    }
  });

  // Move Batch to Processing and set initial WIP
  await supabase.from('manufacturing_orders')
    .update({ 
      status: 'Processing',
      wet_mix_available_qty: wetMixGenerated
    })
    .eq('id', batchId);
    
  revalidatePath('/workstation');
}

export async function submitDryingData(formData: FormData) {
  const supabase = await getSupabase();
  const { companyId, employeeId } = await getAuthContext(supabase);
  const batchId = formData.get('batch_id') as string;
  
  const wetIn = parseFloat(formData.get('wet_in') as string) || 0;
  const dryOut = parseFloat(formData.get('dry_out') as string) || 0;
  
  // Create Log
  await supabase.from('batch_production_logs').insert({
    company_id: companyId,
    manufacturing_order_id: batchId,
    employee_id: employeeId,
    stage: 'Drying',
    step_name: 'Drying Yield Logged',
    metric_data: {
      wet_weight_in: wetIn,
      dry_weight_out: dryOut,
      unit: 'kg'
    }
  });

  // Deduct from Wet WIP, Add to Dry WIP
  const { data: batch } = await supabase.from('manufacturing_orders')
    .select('wet_mix_available_qty, dry_material_available_qty')
    .eq('id', batchId)
    .single();
    
  await supabase.from('manufacturing_orders')
    .update({ 
      wet_mix_available_qty: Math.max(0, (batch?.wet_mix_available_qty || 0) - wetIn),
      dry_material_available_qty: (batch?.dry_material_available_qty || 0) + dryOut
    })
    .eq('id', batchId);
    
  revalidatePath('/workstation');
}

export async function submitGrindingData(formData: FormData) {
  const supabase = await getSupabase();
  const { companyId, employeeId } = await getAuthContext(supabase);
  const batchId = formData.get('batch_id') as string;
  
  const dryIn = parseFloat(formData.get('dry_in') as string) || 0;
  const powderWeight = parseFloat(formData.get('powder_weight') as string) || 0;
  const skusQty = parseInt(formData.get('skus_qty') as string) || 0;
  
  // Create Log
  await supabase.from('batch_production_logs').insert({
    company_id: companyId,
    manufacturing_order_id: batchId,
    employee_id: employeeId,
    stage: 'Grinding',
    step_name: 'Final Packaging Logged',
    metric_data: {
      dry_material_used: dryIn,
      finished_powder_weight: powderWeight,
      skus_completed: skusQty
    }
  });

  // Deduct from Dry WIP
  const { data: batch } = await supabase.from('manufacturing_orders')
    .select('wet_mix_available_qty, dry_material_available_qty')
    .eq('id', batchId)
    .single();
    
  const newDry = Math.max(0, (batch?.dry_material_available_qty || 0) - dryIn);
  
  // Auto-complete the batch if all WIP is exhausted
  let status = 'Processing';
  let updateData: any = { dry_material_available_qty: newDry };
  
  if ((batch?.wet_mix_available_qty || 0) <= 0 && newDry <= 0) {
    updateData.status = 'Completed';
    updateData.end_date = new Date().toISOString();
  }

  await supabase.from('manufacturing_orders')
    .update(updateData)
    .eq('id', batchId);
    
  // Ideally here we would also update inventory levels.
  
  revalidatePath('/workstation');
}
