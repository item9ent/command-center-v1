-- MVP Phase 3: Sales, Orders, and Purchasing Schema
-- Quotes, Sales Orders, Purchase Orders, and Line Items

-- 1. Quotes
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  quote_number VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Sent, Accepted, Rejected, Expired
  total_amount DECIMAL(12, 2) DEFAULT 0.00,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sales Orders
CREATE TABLE sales_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  order_number VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Processing, Shipped, Delivered, Cancelled
  total_amount DECIMAL(12, 2) DEFAULT 0.00,
  expected_ship_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Purchase Orders
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  po_number VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Submitted, Approved, Partially Received, Received, Cancelled
  total_amount DECIMAL(12, 2) DEFAULT 0.00,
  expected_delivery_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Line Items (Unified table with explicit FKs to maintain referential integrity)
CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Record Links (Only one should be NOT NULL)
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  sales_order_id UUID REFERENCES sales_orders(id) ON DELETE CASCADE,
  purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
  
  -- Item Links
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  material_id UUID REFERENCES materials(id) ON DELETE SET NULL,
  
  description VARCHAR(255) NOT NULL,
  quantity DECIMAL(12, 2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  total_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CHECK (
    (quote_id IS NOT NULL AND sales_order_id IS NULL AND purchase_order_id IS NULL) OR
    (sales_order_id IS NOT NULL AND quote_id IS NULL AND purchase_order_id IS NULL) OR
    (purchase_order_id IS NOT NULL AND quote_id IS NULL AND sales_order_id IS NULL)
  )
);
