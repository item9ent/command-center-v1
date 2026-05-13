-- MVP Phase 8: HR, Calendar, & Labor Tracking Schema
-- Employees, Time Off, Shifts, Timesheets, Certifications, and Batch Labor Traceability

-- 1. Employees
-- Expands on the users table but allows for floor workers without app access
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Optional, if they have an app login
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  job_title VARCHAR(150),
  department VARCHAR(100),
  hire_date DATE,
  employment_status VARCHAR(50) DEFAULT 'Full-Time', -- Full-Time, Part-Time, Contractor
  hourly_rate DECIMAL(10, 2), -- Protected by RLS!
  salary DECIMAL(12, 2),      -- Protected by RLS!
  manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  pin_code VARCHAR(10), -- For manual kiosk clock-ins without an account
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Time Off Requests
CREATE TABLE time_off_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  type VARCHAR(50) NOT NULL, -- PTO, Sick, Unpaid, Bereavement
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Approved, Denied
  reason TEXT,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Shifts (Calendar Engine)
CREATE TABLE shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  role_for_shift VARCHAR(100), -- e.g., "Mixer", "Bottling Line"
  location VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Scheduled', -- Scheduled, Completed, No-Show
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Timesheets (Clock In/Out)
CREATE TABLE timesheets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES shifts(id) ON DELETE SET NULL, -- Optional link to scheduled shift
  clock_in TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  clock_out TIMESTAMP WITH TIME ZONE,
  total_hours DECIMAL(5, 2),
  clock_in_location_lat DECIMAL(10, 8), -- For Geofencing validation
  clock_in_location_lng DECIMAL(11, 8),
  clock_out_location_lat DECIMAL(10, 8),
  clock_out_location_lng DECIMAL(11, 8),
  status VARCHAR(50) DEFAULT 'Active', -- Active, Completed, Flagged
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Manufacturing Order Labor (Batch Traceability)
CREATE TABLE manufacturing_order_labor (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  manufacturing_order_id UUID REFERENCES manufacturing_orders(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  task_description VARCHAR(255), -- e.g., "Ethanol Extraction Phase 1"
  hours_spent DECIMAL(5, 2) NOT NULL,
  date_worked DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Certifications & Training
CREATE TABLE certifications_training (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  certification_name VARCHAR(150) NOT NULL,
  issuing_body VARCHAR(150),
  issue_date DATE,
  expiration_date DATE,
  status VARCHAR(50) DEFAULT 'Active', -- Active, Expired, Revoked
  document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- -------------------------------------------------------------
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_off_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturing_order_labor ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications_training ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    t_name text;
    tables_with_company_id text[] := ARRAY[
        'employees', 'time_off_requests', 'shifts', 'timesheets', 'manufacturing_order_labor'
    ];
BEGIN
    FOREACH t_name IN ARRAY tables_with_company_id
    LOOP
        EXECUTE format('
            CREATE POLICY "Tenant Isolation: Select %I" ON %I FOR SELECT USING (company_id = get_user_company_id());
            CREATE POLICY "Tenant Isolation: Insert %I" ON %I FOR INSERT WITH CHECK (company_id = get_user_company_id());
            CREATE POLICY "Tenant Isolation: Update %I" ON %I FOR UPDATE USING (company_id = get_user_company_id());
            CREATE POLICY "Tenant Isolation: Delete %I" ON %I FOR DELETE USING (company_id = get_user_company_id());
        ', t_name, t_name, t_name, t_name, t_name, t_name, t_name, t_name);
    END LOOP;
END
$$;

-- Certifications relies on employee_id's company_id
CREATE POLICY "Tenant Isolation: certifications_training" ON certifications_training
  FOR ALL USING (
    employee_id IN (SELECT id FROM employees WHERE company_id = get_user_company_id())
  );
