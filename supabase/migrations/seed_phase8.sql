-- Seed Data for Phase 8 (HR & Labor Tracking)

-- 1. Insert Employees
INSERT INTO employees (id, company_id, first_name, last_name, job_title, department, employment_status, hourly_rate)
SELECT 
  'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', c.id, 'John', 'Doe', 'Lead Extractor', 'Manufacturing', 'Full-Time', 25.50
FROM companies c LIMIT 1;

INSERT INTO employees (id, company_id, first_name, last_name, job_title, department, employment_status, hourly_rate)
SELECT 
  'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2', c.id, 'Jane', 'Smith', 'QA Specialist', 'Quality Control', 'Full-Time', 28.00
FROM companies c LIMIT 1;

-- 2. Insert Upcoming Shifts
INSERT INTO shifts (company_id, employee_id, start_time, end_time, role_for_shift, status)
SELECT 
  c.id, 'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', CURRENT_DATE + TIME '08:00:00', CURRENT_DATE + TIME '16:00:00', 'Extraction Lab 1', 'Scheduled'
FROM companies c LIMIT 1;

INSERT INTO shifts (company_id, employee_id, start_time, end_time, role_for_shift, status)
SELECT 
  c.id, 'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2', CURRENT_DATE + TIME '09:00:00', CURRENT_DATE + TIME '17:00:00', 'Lab Test Floor', 'Scheduled'
FROM companies c LIMIT 1;

-- 3. Insert Timesheet (Clock In yesterday)
INSERT INTO timesheets (company_id, employee_id, clock_in, clock_out, total_hours, status)
SELECT 
  c.id, 'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', CURRENT_DATE - INTERVAL '1 day' + TIME '08:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '16:00:00', 8.0, 'Completed'
FROM companies c LIMIT 1;

-- 4. Assign Labor to a Batch Record (Traceability)
-- BATCH-2026-001 was created in Phase 6 seed
INSERT INTO manufacturing_order_labor (company_id, manufacturing_order_id, employee_id, task_description, hours_spent, date_worked)
SELECT 
  c.id, 
  (SELECT id FROM manufacturing_orders WHERE batch_number = 'BATCH-2026-001' LIMIT 1),
  'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
  'Monitored ethanol extraction centrifuge',
  4.5,
  CURRENT_DATE - INTERVAL '1 day'
FROM companies c LIMIT 1;

-- 5. Insert Certification
INSERT INTO certifications_training (employee_id, certification_name, issuing_body, issue_date, expiration_date)
VALUES 
('e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', 'Hazardous Waste Handling', 'OSHA', CURRENT_DATE - INTERVAL '1 year', CURRENT_DATE + INTERVAL '1 year');
