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

// Ensure the user's company ID is automatically injected into new records
async function getCompanyId(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data: userRecord } = await supabase
    .from('users')
    .select('company_id')
    .eq('id', user.id)
    .single();
    
  return userRecord?.company_id;
}

export async function addCustomer(formData: FormData) {
  const supabase = await getSupabase();
  const companyId = await getCompanyId(supabase);
  
  const { error } = await supabase.from('customers').insert({
    company_id: companyId,
    name: formData.get('name'),
    type: formData.get('type') || 'B2B',
    status: 'Active',
    payment_terms: formData.get('payment_terms') || 'Net 30',
    email: formData.get('email'),
    phone: formData.get('phone'),
    shipping_address: formData.get('shipping_address'),
    billing_address: formData.get('billing_address'),
    preferred_contact_method: formData.get('preferred_contact_method')
  });
  
  if (error) throw error;
  revalidatePath('/settings');
}

export async function addVendor(formData: FormData) {
  const supabase = await getSupabase();
  const companyId = await getCompanyId(supabase);
  
  const { error } = await supabase.from('vendors').insert({
    company_id: companyId,
    name: formData.get('name'),
    vendor_type: formData.get('vendor_type') || 'Raw Materials',
    payment_terms: formData.get('payment_terms') || 'Net 30',
    status: 'Active',
    email: formData.get('email'),
    phone: formData.get('phone'),
    shipping_address: formData.get('shipping_address'),
    billing_address: formData.get('billing_address'),
    preferred_contact_method: formData.get('preferred_contact_method')
  });
  
  if (error) throw error;
  revalidatePath('/settings');
}

export async function addMaterial(formData: FormData) {
  const supabase = await getSupabase();
  const companyId = await getCompanyId(supabase);
  
  const { error } = await supabase.from('materials').insert({
    company_id: companyId,
    sku: formData.get('sku'),
    name: formData.get('name'),
    category: formData.get('category'),
    unit_of_measure: formData.get('unit_of_measure'),
    cost_per_unit: parseFloat(formData.get('cost_per_unit') as string) || 0,
    minimum_stock_level: parseFloat(formData.get('minimum_stock_level') as string) || 0
  });
  
  if (error) throw error;
  revalidatePath('/settings');
}

export async function addProduct(formData: FormData) {
  const supabase = await getSupabase();
  const companyId = await getCompanyId(supabase);
  
  const { error } = await supabase.from('products').insert({
    company_id: companyId,
    sku: formData.get('sku'),
    name: formData.get('name'),
    category: formData.get('category'),
    base_price: parseFloat(formData.get('base_price') as string) || 0,
    status: 'Active'
  });
  
  if (error) throw error;
  revalidatePath('/settings');
}

export async function addEmployee(formData: FormData) {
  const supabase = await getSupabase();
  const companyId = await getCompanyId(supabase);
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  
  let newUserId = null;

  // 1. If email and password are provided, create the Auth User
  if (email && password) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for admin user creation.");
    }
    
    // Use the Service Role Key to bypass RLS and create users programmatically
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm for internal dashboards
      user_metadata: { first_name: firstName, last_name: lastName }
    });

    if (authError) throw new Error(`Auth Error: ${authError.message}`);
    
    newUserId = authData.user.id;

    // 2. Create the Command Center User Profile
    const { error: profileError } = await supabaseAdmin.from('users').insert({
      id: newUserId,
      company_id: companyId,
      email: email,
      role: role || 'Floor Staff',
      first_name: firstName,
      last_name: lastName
    });
    
    if (profileError) throw new Error(`Profile Error: ${profileError.message}`);
  }
  
  // 3. Create the HR Employee Record (linked to the user if one was created)
  const { error: hrError } = await supabase.from('employees').insert({
    company_id: companyId,
    user_id: newUserId, // Will be null if no account was generated
    first_name: firstName,
    last_name: lastName,
    email: email, // Can be from the login info OR regular contact info
    phone: formData.get('phone'),
    address: formData.get('address'),
    preferred_contact_method: formData.get('preferred_contact_method'),
    job_title: formData.get('job_title'),
    department: formData.get('department'),
    employment_status: formData.get('employment_status') || 'Full-Time',
    hourly_rate: parseFloat(formData.get('hourly_rate') as string) || 0,
    hire_date: new Date().toISOString()
  });
  
  if (hrError) throw new Error(`HR Error: ${hrError.message}`);
  
  revalidatePath('/settings');
  revalidatePath('/hr');
}
