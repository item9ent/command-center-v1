import Link from "next/link";
import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const params = await searchParams;
  
  return (
    <div className="card shadow-lg border-border-color">
      <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>
      
      {params?.message && (
        <div className="bg-danger-color/10 text-danger-color p-3 rounded-md text-sm mb-4">
          {params.message}
        </div>
      )}
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="you@company.com" 
            className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition-shadow"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-text-primary">Password</label>
            <Link href="#" className="text-xs text-accent-color hover:underline">Forgot password?</Link>
          </div>
          <input 
            type="password" 
            name="password"
            placeholder="••••••••" 
            className="w-full bg-black/5 dark:bg-white/5 border border-border-color rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition-shadow"
            required
          />
        </div>
        
        <div className="flex gap-2 mt-4">
          <button formAction={login} className="w-full btn btn-primary py-2.5">
            Sign In
          </button>
          <button formAction={signup} className="w-full btn btn-secondary py-2.5">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
