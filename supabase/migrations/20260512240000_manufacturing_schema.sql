-- MVP Phase 6: Manufacturing and Batch Records Schema
-- Bill of Materials, Manufacturing Orders (Batch Records), and Material Consumption

-- 1. Bill of Materials (BOM)
-- The "Recipe" that links a Finished Product to its required Raw Materials
CREATE TABLE bill_of_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL, -- e.g., "Standard Mix BOM v1"
  version VARCHAR(50) DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1a. BOM Items (The specific ingredients and expected quantities)
CREATE TABLE bom_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bom_id UUID REFERENCES bill_of_materials(id) ON DELETE CASCADE,
  material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
  quantity DECIMAL(12, 4) NOT NULL, -- Expected amount needed per 1 unit of product
  unit_of_measure VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Manufacturing Orders (Batch Records)
-- The actual work order tracking a specific production run
CREATE TABLE manufacturing_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  bom_id UUID REFERENCES bill_of_materials(id) ON DELETE SET NULL, -- The recipe used
  batch_number VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Planned, Mixing, QA, Bottling, Completed, Cancelled
  target_quantity DECIMAL(12, 2) NOT NULL,
  actual_yield DECIMAL(12, 2) DEFAULT 0.00,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  supervisor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Manufacturing Order Materials
-- Tracks EXACTLY what ingredients (and specific lots if applicable) were consumed in the batch
CREATE TABLE manufacturing_order_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  manufacturing_order_id UUID REFERENCES manufacturing_orders(id) ON DELETE CASCADE,
  material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
  
  -- The inventory lot we pulled this from (optional if lot tracking is simplified)
  inventory_item_id UUID REFERENCES inventory_items(id) ON DELETE SET NULL,
  
  expected_quantity DECIMAL(12, 4) NOT NULL, -- Calculated from BOM * Target Quantity
  actual_quantity_used DECIMAL(12, 4), -- What was actually poured in
  variance_reason VARCHAR(255),
  
  added_by UUID REFERENCES users(id) ON DELETE SET NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Note on COAs:
-- Certificates of Analysis will be uploaded to the `documents` table.
-- They will be linked via the `document_links` table with:
-- related_record_type = 'manufacturing_order' (for finished goods COAs)
-- or related_record_type = 'inventory_item' (for received raw material lot COAs)
