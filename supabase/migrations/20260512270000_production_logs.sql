-- Phase 11: Production Logs & EBR Tracking

CREATE TABLE batch_production_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  manufacturing_order_id UUID REFERENCES manufacturing_orders(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  stage VARCHAR(100) NOT NULL, -- 'Mixing', 'Drying', 'Grinding'
  step_name VARCHAR(255) NOT NULL, -- e.g., 'Added Extract', 'Logged Final Yield'
  metric_data JSONB, -- Stores {"actual_qty": 50, "unit": "kg"}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE batch_production_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant Isolation: Select batch_production_logs" ON batch_production_logs FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "Tenant Isolation: Insert batch_production_logs" ON batch_production_logs FOR INSERT WITH CHECK (company_id = get_user_company_id());
CREATE POLICY "Tenant Isolation: Update batch_production_logs" ON batch_production_logs FOR UPDATE USING (company_id = get_user_company_id());
CREATE POLICY "Tenant Isolation: Delete batch_production_logs" ON batch_production_logs FOR DELETE USING (company_id = get_user_company_id());
