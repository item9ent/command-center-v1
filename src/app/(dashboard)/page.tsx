import { Activity, AlertCircle, ArrowUpRight, BarChart3, CheckSquare, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AIChat } from "@/components/AIChat";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export default async function CommandCenter() {
  const supabase = await createClient();

  // Ensure user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch Open Tasks
  const { data: tasks } = await supabase.from('tasks').select('*').eq('status', 'Open').order('priority', { ascending: false }).limit(4);
  const openTasks = tasks || [];

  // Fetch Active Alerts
  const { data: alerts } = await supabase.from('alerts').select('*').eq('status', 'Active').order('created_at', { ascending: false }).limit(3);
  const activeAlerts = alerts || [];

  // Generate Live AI Briefing
  let aiBriefing = "Generating your daily briefing...";
  try {
    const dataContext = `
      Open Tasks: ${JSON.stringify(openTasks)}
      Active Alerts: ${JSON.stringify(activeAlerts)}
      Current Date: ${new Date().toLocaleDateString()}
    `;

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: `You are the 'ENHAZED AI', an AI Business Assistant. Write a short, punchy 3-sentence "Daily Briefing" for the executive team. 
      Read the provided JSON data to see what is happening today. 
      Start with "Good morning!" or "Hello team!".
      Mention specific task titles or alert warnings. 
      Do NOT use markdown, just return plain text.`,
      prompt: `Here is the current state of the business: ${dataContext}`
    });
    aiBriefing = text;
  } catch (error) {
    console.error("AI Briefing failed:", error);
    aiBriefing = "Good morning! Unable to connect to ENHAZED AI. You have " + openTasks.length + " priority tasks today.";
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Command Center</h1>
          <p className="text-subtle mt-1">Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary border-border-color shadow-sm">View Reports</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Briefing - Premium Glassmorphism Card */}
          <section className="relative overflow-hidden rounded-2xl border border-accent-color/30 bg-gradient-to-br from-accent-color/5 to-transparent p-6 shadow-sm">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Sparkles className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-accent-color">
                <Sparkles className="w-5 h-5" /> 
                Live AI Daily Briefing
              </h2>
              <p className="text-text-primary leading-relaxed max-w-3xl">
                {aiBriefing}
              </p>
            </div>
          </section>

          {/* KPIs Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Open Orders", value: "$124,500", icon: BarChart3, trend: "+5.2%", trendUp: true },
              { label: "Active Quotes", value: "$45,200", icon: Activity, trend: "-1.1%", trendUp: false },
              { label: "Pending Approvals", value: "3", icon: CheckSquare, trend: "Requires Action", trendUp: true },
              { label: "System Alerts", value: activeAlerts.length.toString(), icon: AlertCircle, trend: activeAlerts.length > 0 ? "Critical" : "All Clear", trendUp: activeAlerts.length === 0 },
            ].map((kpi, i) => (
              <div key={i} className="card hover:border-accent-color/50 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-subtle">{kpi.label}</h3>
                  <kpi.icon className="h-4 w-4 text-subtle group-hover:text-accent-color transition-colors" />
                </div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className={`text-xs mt-2 ${kpi.trendUp ? 'text-success-color' : 'text-danger-color'}`}>
                  {kpi.trend}
                </p>
              </div>
            ))}
          </section>

          {/* Lists / Feeds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Tasks */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-accent-color" />
                  Priority Tasks
                </h2>
                <button className="text-sm text-accent-color hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {openTasks.length > 0 ? openTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between p-3 rounded-lg border border-border-color bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer">
                    <div>
                      <h3 className="text-sm font-medium">{task.title}</h3>
                      <p className="text-xs text-subtle mt-1">{task.priority} Priority • Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No Date'}</p>
                    </div>
                    <button className="p-1 rounded text-subtle hover:text-accent-color hover:bg-accent-color/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )) : (
                  <div className="text-center p-6 text-subtle text-sm">No priority tasks today!</div>
                )}
              </div>
            </div>

            {/* Actionable Alerts */}
            <div className="card border-warning-color/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-warning-color" />
                  Recent Alerts
                </h2>
              </div>
              <div className="space-y-3">
                {activeAlerts.length > 0 ? activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg border-l-4 border-warning-color bg-warning-color/5 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{alert.type}</p>
                      <p className="text-xs text-subtle mt-1">{alert.message}</p>
                    </div>
                    <span className="text-xs font-semibold text-warning-color uppercase tracking-wider">{alert.is_urgent ? 'Urgent' : 'Notice'}</span>
                  </div>
                )) : (
                  <div className="text-center p-6 text-subtle text-sm">No active alerts!</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (AI Chat) */}
        <div className="lg:col-span-1 h-full">
          <div className="sticky top-6">
            <AIChat />
          </div>
        </div>

      </div>
    </div>
  );
}
