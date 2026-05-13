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

export async function approveRequest(formData: FormData) {
  const supabase = await getSupabase();
  const requestId = formData.get('request_id') as string;
  const recordType = formData.get('record_type') as string;
  const recordId = formData.get('record_id') as string;

  // 1. Update Approval Request
  const { error } = await supabase.from('approval_requests')
    .update({ 
      status: 'Approved', 
      resolved_at: new Date().toISOString() 
    })
    .eq('id', requestId);

  if (error) throw error;

  // 2. Update the parent record if it's a Quote
  if (recordType === 'Quote') {
    await supabase.from('quotes').update({ status: 'Approved' }).eq('id', recordId);
    revalidatePath('/sales');
  }

  revalidatePath('/alerts');
}

export async function rejectRequest(formData: FormData) {
  const supabase = await getSupabase();
  const requestId = formData.get('request_id') as string;
  const recordType = formData.get('record_type') as string;
  const recordId = formData.get('record_id') as string;

  // 1. Update Approval Request
  const { error } = await supabase.from('approval_requests')
    .update({ 
      status: 'Rejected', 
      resolved_at: new Date().toISOString() 
    })
    .eq('id', requestId);

  if (error) throw error;

  // 2. Update the parent record if it's a Quote
  if (recordType === 'Quote') {
    await supabase.from('quotes').update({ status: 'Rejected' }).eq('id', recordId);
    revalidatePath('/sales');
  }

  revalidatePath('/alerts');
}
