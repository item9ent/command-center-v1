-- MVP Phase 2: Execution Layer Schema
-- Tasks, Alerts, and Approval Requests

-- 1. Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Open', -- Open, In Progress, Completed, Blocked
  priority VARCHAR(50) DEFAULT 'Normal', -- Low, Normal, High, Urgent
  due_date TIMESTAMP WITH TIME ZONE,
  assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  related_record_type VARCHAR(100), -- Customer, Order, Document, etc.
  related_record_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL, -- Inventory, System, Sales, Compliance
  message TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'Active', -- Active, Dismissed, Resolved
  related_record_type VARCHAR(100),
  related_record_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- 3. Approval Requests
CREATE TABLE approval_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL, -- Quote, Purchase Order, Contract
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Approved, Rejected
  requester_id UUID REFERENCES users(id) ON DELETE SET NULL,
  approver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2),
  justification TEXT,
  rejection_reason TEXT,
  related_record_type VARCHAR(100) NOT NULL,
  related_record_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP WITH TIME ZONE
);
