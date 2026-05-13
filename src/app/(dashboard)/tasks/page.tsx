"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { CheckSquare, Clock, Filter, Plus, X } from "lucide-react";
import { createTask, updateTaskStatus } from '@/app/actions/crm-tasks';

export default function TasksDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = async () => {
    setLoading(true);
    const [tRes, eRes] = await Promise.all([
      // Note: In MVP we just display assignee ID if no join is available yet, or we can fetch employees and map them
      supabase.from('tasks').select('*').order('due_date', { ascending: true }),
      supabase.from('employees').select('id, first_name, last_name, job_title').order('first_name')
    ]);
    
    setTasks(tRes.data || []);
    setEmployees(eRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createTask(formData);
      setShowTaskModal(false);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'Open' : 'Completed';
    try {
      await updateTaskStatus(taskId, newStatus);
      fetchData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const openTasks = tasks.filter(t => t.status !== 'Completed');
  const overdueTasks = openTasks.filter(t => t.due_date && new Date(t.due_date) < new Date());

  const getEmployeeName = (id: string) => {
    const emp = employees.find(e => e.id === id);
    return emp ? `${emp.first_name} ${emp.last_name}` : 'Unassigned';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks & Accountability</h1>
          <p className="text-subtle mt-1">Track priorities across the team</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
          <button onClick={() => setShowTaskModal(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New Task</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-subtle">My Open Tasks</h3>
            <CheckSquare className="h-4 w-4 text-accent-color" />
          </div>
          <p className="text-2xl font-bold">{openTasks.length}</p>
        </div>
        <div className="card border-danger-color/50 bg-danger-color/5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-danger-color">Overdue (Team)</h3>
            <Clock className="h-4 w-4 text-danger-color" />
          </div>
          <p className="text-2xl font-bold text-danger-color">{overdueTasks.length}</p>
        </div>
      </div>

      <section className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-color bg-black/5 dark:bg-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Active Tasks</h2>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-black/5 dark:bg-white/5 border-b border-border-color">
            <tr>
              <th className="px-4 py-3 font-medium w-8"></th>
              <th className="px-4 py-3 font-medium">Task</th>
              <th className="px-4 py-3 font-medium">Assigned To</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {tasks.map((row) => {
              const isOverdue = row.due_date && new Date(row.due_date) < new Date();
              const dueDisplay = row.due_date ? new Date(row.due_date).toLocaleDateString() : 'No Date';
              const isCompleted = row.status === 'Completed';
              
              return (
                <tr key={row.id} className={`hover:bg-black/5 dark:hover:bg-white/5 transition-colors group ${isCompleted ? 'opacity-50 line-through' : ''}`}>
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={isCompleted} 
                      onChange={() => handleToggleComplete(row.id, row.status)}
                      className="rounded border-border-color text-accent-color focus:ring-accent-color cursor-pointer w-4 h-4" 
                    />
                  </td>
                  <td className="px-4 py-3 font-medium group-hover:text-accent-color transition-colors">{row.title}</td>
                  <td className="px-4 py-3 text-subtle">{getEmployeeName(row.assigned_employee_id)}</td>
                  <td className={`px-4 py-3 ${isOverdue && !isCompleted ? 'text-danger-color font-medium' : 'text-subtle'}`}>{dueDisplay}</td>
                  <td className="px-4 py-3">
                    {row.priority === 'Urgent' || row.priority === 'High' ? (
                      <span className="px-2 py-0.5 rounded-full bg-danger-color/10 text-danger-color text-xs font-medium">{row.priority}</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium">{row.priority}</span>
                    )}
                  </td>
                </tr>
              )
            })}
            {tasks.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-subtle">No tasks found. Create one to get started!</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* NEW TASK MODAL */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Assign New Task</h2>
              <button onClick={() => setShowTaskModal(false)} className="text-subtle hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <form action={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input type="text" name="title" required className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea name="description" rows={3} className="w-full bg-background border border-border-color rounded-lg px-3 py-2"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assign To</label>
                <select name="assigned_employee_id" className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                  <option value="">Unassigned</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name} - {e.job_title}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select name="priority" className="w-full bg-background border border-border-color rounded-lg px-3 py-2">
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input type="date" name="due_date" className="w-full bg-background border border-border-color rounded-lg px-3 py-2" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn btn-primary mt-4 py-2">
                {isSubmitting ? 'Creating...' : 'Assign Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
