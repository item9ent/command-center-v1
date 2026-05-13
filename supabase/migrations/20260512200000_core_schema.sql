-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Company and Access Objects

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  legal_name VARCHAR(255) NOT NULL,
  dba_name VARCHAR(255),
  entity_type VARCHAR(100),
  ein VARCHAR(50),
  primary_address TEXT,
  phone_number VARCHAR(50),
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  approval_level INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY, -- Should map to auth.users in Supabase
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  module VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  UNIQUE(role_id, module, action)
);

-- 2. Sales and Customer Objects

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  customer_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Lead',
  sales_stage VARCHAR(100),
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  billing_address TEXT,
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Vendor and Purchasing Objects
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  vendor_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Active',
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  payment_terms VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  is_primary BOOLEAN DEFAULT false,
  CHECK (customer_id IS NOT NULL OR vendor_id IS NOT NULL)
);

-- 4. Product and Inventory Objects

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Active',
  standard_cost DECIMAL(12, 2),
  sale_price DECIMAL(12, 2),
  unit_of_measure VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  default_vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  unit_of_measure VARCHAR(50),
  reorder_point DECIMAL(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('Product', 'Material')),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
  quantity_on_hand DECIMAL(12, 2) DEFAULT 0,
  quantity_reserved DECIMAL(12, 2) DEFAULT 0,
  location VARCHAR(255),
  last_counted_at TIMESTAMP WITH TIME ZONE,
  CHECK (
    (item_type = 'Product' AND product_id IS NOT NULL AND material_id IS NULL) OR
    (item_type = 'Material' AND material_id IS NOT NULL AND product_id IS NULL)
  )
);

-- 5. Notes and Communications

CREATE TABLE notes_communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- Note, Email, Meeting, Call, Text
  subject VARCHAR(255),
  body_summary TEXT,
  participants JSONB DEFAULT '[]'::jsonb,
  source VARCHAR(100),
  sent_received_status VARCHAR(50),
  follow_up_required BOOLEAN DEFAULT false,
  attachments JSONB DEFAULT '[]'::jsonb,
  ai_extracted_action_items JSONB DEFAULT '[]'::jsonb,
  related_record_type VARCHAR(100),
  related_record_id UUID,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Documents

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100),
  file_url VARCHAR(500) NOT NULL,
  status VARCHAR(50) DEFAULT 'Active',
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ai_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_links (
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  related_record_type VARCHAR(100) NOT NULL,
  related_record_id UUID NOT NULL,
  PRIMARY KEY (document_id, related_record_type, related_record_id)
);

-- 7. Activity Logs
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  actor_type VARCHAR(50) NOT NULL, -- User, AI, System
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR(100) NOT NULL,
  related_record_type VARCHAR(100),
  related_record_id UUID,
  before_state JSONB,
  after_state JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
