import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export default async function DebugPage() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
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

  // Fetch current auth session
  const { data: authUser, error: authError } = await supabase.auth.getUser();

  // Fetch data with RLS
  const [usersRes, companiesRes, customersRes, vendorsRes, productsRes] = await Promise.all([
    supabase.from('users').select('*'),
    supabase.from('companies').select('*'),
    supabase.from('customers').select('id, name, company_id').limit(5),
    supabase.from('vendors').select('id, name, company_id').limit(5),
    supabase.from('products').select('id, name, company_id').limit(5)
  ]);

  return (
    <div className="p-8 font-mono text-xs max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold border-b pb-2">ENHAZED OS Database Debugger</h1>
      
      <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg">
        <h2 className="font-bold text-red-500">1. Authentication Status</h2>
        <pre className="mt-2 overflow-auto max-h-40">
          {JSON.stringify({ 
            user_id: authUser?.user?.id, 
            email: authUser?.user?.email,
            error: authError?.message 
          }, null, 2)}
        </pre>
      </div>

      <div className="bg-blue-500/10 border border-blue-500 p-4 rounded-lg">
        <h2 className="font-bold text-blue-500">2. Your Public User Profile (public.users)</h2>
        <pre className="mt-2 overflow-auto max-h-40">
          {JSON.stringify(usersRes.data || usersRes.error, null, 2)}
        </pre>
      </div>

      <div className="bg-green-500/10 border border-green-500 p-4 rounded-lg">
        <h2 className="font-bold text-green-500">3. Your Company (companies)</h2>
        <pre className="mt-2 overflow-auto max-h-40">
          {JSON.stringify(companiesRes.data || companiesRes.error, null, 2)}
        </pre>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="font-bold text-white mb-2">Customers (Top 5)</h2>
          <pre className="overflow-auto max-h-60 text-[10px]">
            {JSON.stringify(customersRes.data || customersRes.error, null, 2)}
          </pre>
        </div>
        
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="font-bold text-white mb-2">Vendors (Top 5)</h2>
          <pre className="overflow-auto max-h-60 text-[10px]">
            {JSON.stringify(vendorsRes.data || vendorsRes.error, null, 2)}
          </pre>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="font-bold text-white mb-2">Products (Top 5)</h2>
          <pre className="overflow-auto max-h-60 text-[10px]">
            {JSON.stringify(productsRes.data || productsRes.error, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
