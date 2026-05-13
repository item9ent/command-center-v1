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

async function getAuthContext(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data: userRecord } = await supabase
    .from('users')
    .select('company_id')
    .eq('id', user.id)
    .single();
    
  return { companyId: userRecord?.company_id, userId: user.id };
}

// --- TASKS ---
export async function createTask(formData: FormData) {
  const supabase = await getSupabase();
  const { companyId, userId } = await getAuthContext(supabase);
  
  const { error } = await supabase.from('tasks').insert({
    company_id: companyId,
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority') || 'Normal',
    due_date: formData.get('due_date') ? new Date(formData.get('due_date') as string).toISOString() : null,
    assigned_employee_id: formData.get('assigned_employee_id') || null,
    created_by: userId,
    status: 'Open'
  });

  if (error) throw error;
  revalidatePath('/tasks');
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  const supabase = await getSupabase();
  
  const { error } = await supabase.from('tasks')
    .update({ status: newStatus })
    .eq('id', taskId);

  if (error) throw error;
  revalidatePath('/tasks');
}

// --- CRM & QUOTES ---
export async function createQuote(formData: FormData) {
  const supabase = await getSupabase();
  const { companyId, userId } = await getAuthContext(supabase);
  
  const quoteNumber = `QT-${Math.floor(1000 + Math.random() * 9000)}`;
  const totalAmount = parseFloat(formData.get('total_amount') as string) || 0;

  const { data: quote, error } = await supabase.from('quotes').insert({
    company_id: companyId,
    customer_id: formData.get('customer_id'),
    quote_number: quoteNumber,
    total_amount: totalAmount,
    status: 'Pending',
    created_by: userId
  }).select('id').single();

  if (error) throw error;

  // Insert single line item for MVP
  const productId = formData.get('product_id');
  if (productId) {
    await supabase.from('line_items').insert({
      company_id: companyId,
      quote_id: quote.id,
      product_id: productId,
      description: 'Quote Line Item',
      quantity: parseFloat(formData.get('quantity') as string) || 1,
      total_price: totalAmount
    });
  }

  // Generate an Approval Request for the Quote
  await supabase.from('approval_requests').insert({
    company_id: companyId,
    type: 'Quote',
    status: 'Pending',
    requester_id: userId,
    amount: totalAmount,
    justification: `Approval requested for new quote ${quoteNumber}`,
    related_record_type: 'Quote',
    related_record_id: quote.id
  });

  revalidatePath('/sales');
  revalidatePath('/alerts');
}
