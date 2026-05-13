import { FileText, Upload, Search, Link, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DocumentsDashboard() {
  const supabase = await createClient();

  // Fetch documents metadata
  const { data: documents } = await supabase
    .from('documents')
    .select('*, users(email)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents & AI Insights</h1>
          <p className="text-subtle mt-1">Manage files, compliance records, and AI summaries</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-primary"><Upload className="w-4 h-4" /> Upload File</button>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">Total Files</h3>
            <FileText className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{documents?.length || 0}</p>
        </div>
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">AI Processed</h3>
            <Sparkles className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{documents?.filter(d => d.is_processed_by_ai).length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Directory */}
        <section className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Document Vault</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
              <input type="text" placeholder="Search files..." className="pl-9 pr-3 py-1.5 bg-black/5 dark:bg-white/5 border border-border-color rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent-color" />
            </div>
          </div>
          
          <div className="border border-border-color rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Linked Record</th>
                  <th className="px-4 py-3 font-medium text-center">AI Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {documents && documents.length > 0 ? documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-4 py-3 font-medium group-hover:text-accent-color transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4 text-subtle" />
                      {doc.name}
                    </td>
                    <td className="px-4 py-3 text-subtle">{doc.file_type || 'Unknown'}</td>
                    <td className="px-4 py-3">
                      {doc.related_record_type ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-subtle bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full w-fit">
                          <Link className="w-3 h-3" /> {doc.related_record_type}
                        </span>
                      ) : (
                        <span className="text-xs text-subtle italic">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {doc.is_processed_by_ai ? (
                        <Sparkles className="w-4 h-4 text-accent-color mx-auto" />
                      ) : (
                        <span className="text-subtle">-</span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-subtle border border-dashed border-border-color rounded-lg">
                      No documents found in the vault.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Action Panel */}
        <section className="card bg-gradient-to-br from-accent-color/5 to-transparent border-accent-color/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-accent-color">
              <Sparkles className="w-5 h-5" />
              AI Insights
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 text-sm">
              <p className="text-subtle mb-3">Upload a document to extract action items, identify risks, or summarize long contracts instantly.</p>
              <button className="w-full btn btn-primary py-2 text-sm">Upload & Analyze</button>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle mb-2">Recent Insights</h3>
              {documents && documents.filter(d => d.is_processed_by_ai).length > 0 ? (
                <div className="space-y-2">
                  {documents.filter(d => d.is_processed_by_ai).slice(0, 3).map(doc => (
                    <div key={doc.id} className="p-3 border border-border-color rounded bg-white/5 text-xs">
                      <span className="font-medium">{doc.name}:</span> {doc.ai_summary}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 border border-dashed border-border-color rounded text-center text-xs text-subtle">
                  No AI insights generated yet.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
