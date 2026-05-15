export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">ENHAZED OS</h1>
          <p className="text-subtle text-sm mt-1">ENHAZED OS</p>
        </div>
        {children}
      </div>
    </div>
  );
}
