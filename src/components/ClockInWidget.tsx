"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr';
import { Clock, MapPin, Play, Square, Loader2 } from "lucide-react";

export function ClockInWidget({ employeeId, initialStatus = "Clocked Out" }: { employeeId?: string, initialStatus?: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [geoStatus, setGeoStatus] = useState<"pending" | "located" | "denied">("pending");
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Request Geolocation automatically on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setGeoStatus("located");
        },
        (error) => {
          console.warn("Geolocation denied or failed:", error);
          setGeoStatus("denied");
        }
      );
    } else {
      setGeoStatus("denied");
    }
  }, []);

  const handleClockToggle = async () => {
    if (!employeeId) {
      alert("No active employee profile linked to your account.");
      return;
    }
    
    setLoading(true);
    
    try {
      if (status === "Clocked Out") {
        // Clock In
        const { error } = await supabase
          .from('timesheets')
          .insert({
            employee_id: employeeId,
            clock_in: new Date().toISOString(),
            status: 'Active',
            clock_in_location_lat: location?.lat,
            clock_in_location_lng: location?.lng
          });
          
        if (error) throw error;
        setStatus("Clocked In");
        
      } else {
        // Clock Out (Find active timesheet and update it)
        const { data: activeSheets, error: fetchErr } = await supabase
          .from('timesheets')
          .select('id, clock_in')
          .eq('employee_id', employeeId)
          .eq('status', 'Active')
          .order('clock_in', { ascending: false })
          .limit(1);
          
        if (fetchErr) throw fetchErr;
        
        if (activeSheets && activeSheets.length > 0) {
          const activeSheet = activeSheets[0];
          const clockInTime = new Date(activeSheet.clock_in).getTime();
          const clockOutTime = new Date().getTime();
          const totalHours = (clockOutTime - clockInTime) / (1000 * 60 * 60); // calculate diff in hours
          
          const { error: updateErr } = await supabase
            .from('timesheets')
            .update({
              clock_out: new Date().toISOString(),
              total_hours: Number(totalHours.toFixed(2)),
              status: 'Completed',
              clock_out_location_lat: location?.lat,
              clock_out_location_lng: location?.lng
            })
            .eq('id', activeSheet.id);
            
          if (updateErr) throw updateErr;
        }
        
        setStatus("Clocked Out");
      }
    } catch (err: any) {
      console.error("Clock In Error:", err);
      alert("Failed to clock in/out. Please contact HR.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card-bg border border-border-color rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-color to-blue-500"></div>
      
      <Clock className="w-12 h-12 text-accent-color mb-4" />
      <h2 className="text-3xl font-bold font-mono tracking-wider text-primary mb-1">
        {timeStr || "00:00:00"}
      </h2>
      
      <div className="flex items-center gap-2 text-sm text-subtle mb-6">
        <MapPin className="w-4 h-4" />
        {geoStatus === "pending" && "Locating..."}
        {geoStatus === "located" && "Location Verified"}
        {geoStatus === "denied" && <span className="text-yellow-500">Location Disabled</span>}
      </div>
      
      <button
        onClick={handleClockToggle}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
          status === "Clocked Out" 
            ? "bg-accent-color text-white shadow-lg shadow-accent-color/20" 
            : "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white"
        }`}
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : status === "Clocked Out" ? (
          <>
            <Play className="w-5 h-5 fill-current" />
            Clock In
          </>
        ) : (
          <>
            <Square className="w-5 h-5 fill-current" />
            Clock Out
          </>
        )}
      </button>
      
      {status === "Clocked In" && (
        <div className="mt-4 text-sm text-accent-color animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-color"></div>
          You are currently on the clock
        </div>
      )}
    </div>
  );
}
