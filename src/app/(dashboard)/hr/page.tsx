import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Users, Calendar, ShieldCheck, Activity, MapPin } from 'lucide-react';
import { ClockInWidget } from '@/components/ClockInWidget';

export const dynamic = 'force-dynamic';

export default async function HRDashboard() {
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

  // Get current user and employee profile
  const { data: { user } } = await supabase.auth.getUser();
  let currentEmployeeId: string | undefined;
  let isClockedIn = false;

  if (user) {
    const { data: emp } = await supabase
      .from('employees')
      .select('id')
      .eq('user_id', user.id)
      .single();
      
    if (emp) {
      currentEmployeeId = emp.id;
      
      // Check active timesheet
      const { data: activeSheet } = await supabase
        .from('timesheets')
        .select('id')
        .eq('employee_id', emp.id)
        .eq('status', 'Active')
        .single();
        
      if (activeSheet) isClockedIn = true;
    }
  }

  // Fetch HR Data
  const { data: employees } = await (supabase as any)
    .from('employees')
    .select('*')
    .order('first_name', { ascending: true });

  const { data: shifts } = await (supabase as any)
    .from('shifts')
    .select('*, employees(first_name, last_name)')
    .order('start_time', { ascending: true })
    .limit(5);

  const { data: timesheets } = await (supabase as any)
    .from('timesheets')
    .select('*, employees(first_name, last_name)')
    .order('clock_in', { ascending: false })
    .limit(10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Human Resources</h1>
          <p className="text-subtle mt-1">Workforce management, scheduling, and labor traceability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Clock In & Upcoming Shifts */}
        <div className="space-y-6">
          <ClockInWidget 
            employeeId={currentEmployeeId} 
            initialStatus={isClockedIn ? "Clocked In" : "Clocked Out"} 
          />
          
          <div className="bg-card-bg border border-border-color rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent-color" />
              Upcoming Shifts
            </h3>
            <div className="space-y-4">
              {shifts && shifts.length > 0 ? shifts.map((shift: any) => (
                <div key={shift.id} className="flex flex-col gap-1 p-3 rounded-lg border border-border-color bg-black/5 dark:bg-white/5">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{shift.employees?.first_name} {shift.employees?.last_name}</span>
                    <span className="text-xs px-2 py-1 bg-accent-color/10 text-accent-color rounded-full">
                      {shift.role_for_shift}
                    </span>
                  </div>
                  <div className="text-sm text-subtle mt-2">
                    {new Date(shift.start_time).toLocaleDateString()} • {new Date(shift.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(shift.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              )) : (
                <div className="text-sm text-subtle text-center py-4">No upcoming shifts</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Columns: Roster & Timesheets */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Employee Directory */}
          <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-color flex justify-between items-center bg-black/5 dark:bg-white/5">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-color" />
                Employee Roster
              </h3>
              <div className="text-sm text-subtle">
                {employees?.length || 0} Active Personnel
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-color text-subtle text-sm">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Hire Date</th>
                  </tr>
                </thead>
                <tbody>
                  {employees && employees.length > 0 ? employees.map((emp: any) => (
                    <tr key={emp.id} className="border-b border-border-color/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-primary">
                        {emp.first_name} {emp.last_name}
                      </td>
                      <td className="p-4 text-subtle">
                        <div className="font-medium text-primary text-sm">{emp.job_title}</div>
                        <div className="text-xs">{emp.department}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                          {emp.employment_status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-subtle text-sm">
                        {emp.hire_date ? new Date(emp.hire_date).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="p-4 text-center text-subtle">No employees found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity / Timesheets */}
          <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-color flex justify-between items-center bg-black/5 dark:bg-white/5">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent-color" />
                Recent Clock Activity
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-color text-subtle text-sm">
                    <th className="p-4 font-medium">Employee</th>
                    <th className="p-4 font-medium">Clock In</th>
                    <th className="p-4 font-medium">Clock Out</th>
                    <th className="p-4 font-medium">Location</th>
                    <th className="p-4 font-medium text-right">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {timesheets && timesheets.length > 0 ? timesheets.map((sheet: any) => (
                    <tr key={sheet.id} className="border-b border-border-color/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-primary text-sm">
                        {sheet.employees?.first_name} {sheet.employees?.last_name}
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(sheet.clock_in).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="p-4 text-sm">
                        {sheet.clock_out ? new Date(sheet.clock_out).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : <span className="text-accent-color animate-pulse text-xs">Active Now</span>}
                      </td>
                      <td className="p-4 text-subtle">
                        {sheet.clock_in_location_lat ? (
                           <div className="flex items-center gap-1 text-xs">
                             <MapPin className="w-3 h-3 text-green-500" />
                             Geo-Logged
                           </div>
                        ) : '-'}
                      </td>
                      <td className="p-4 text-right font-mono text-sm">
                        {sheet.total_hours ? `${sheet.total_hours}h` : '-'}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="p-4 text-center text-subtle">No timesheet records</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
