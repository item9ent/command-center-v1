export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen text-black print:bg-white print:m-0 print:p-0">
      {/* We apply specific print styles globally for this route */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; color: black; margin: 0; padding: 0; }
          @page { size: letter; margin: 0.5in; }
          .no-print { display: none !important; }
        }
      `}} />
      <div className="max-w-4xl mx-auto p-8 print:p-0">
        {children}
      </div>
    </div>
  );
}
