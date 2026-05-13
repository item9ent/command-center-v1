-- V2 Phase 1: Fulfillment, Shipping, and Label Generation Schema

-- 1. Shipping Records (ShipStation Integration)
CREATE TABLE shipping_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  sales_order_id UUID REFERENCES sales_orders(id) ON DELETE CASCADE,
  
  -- ShipStation external IDs
  shipstation_order_id VARCHAR(255),
  shipstation_shipment_id VARCHAR(255),
  
  -- Carrier Details
  carrier_code VARCHAR(100), -- e.g., 'stamps_com', 'ups'
  service_code VARCHAR(100), -- e.g., 'usps_priority_mail'
  tracking_number VARCHAR(255),
  shipping_cost DECIMAL(12, 2),
  
  -- Label URL (cached or from ShipStation)
  label_url TEXT,
  
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Label Created, Shipped, Delivered
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Product Labels (Internal Generator)
-- Tracks the printing of physical labels for manufacturing batches
CREATE TABLE product_labels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  
  -- Link back to the specific batch record
  manufacturing_order_id UUID REFERENCES manufacturing_orders(id) ON DELETE SET NULL,
  
  printed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  print_count INTEGER DEFAULT 1,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Document Requirements
-- Maps which documents are strictly required for a product before shipping
CREATE TABLE document_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  
  document_type VARCHAR(100) NOT NULL, -- e.g. 'COA', 'Safety Data Sheet', 'Packing Slip'
  is_required_for_shipping BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add updated_at trigger for shipping_records
CREATE TRIGGER update_shipping_records_updated_at
    BEFORE UPDATE ON shipping_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE shipping_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requirements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Tenant Isolation: shipping_records" ON shipping_records
  FOR ALL USING (company_id = get_user_company_id());

CREATE POLICY "Tenant Isolation: product_labels" ON product_labels
  FOR ALL USING (company_id = get_user_company_id());

CREATE POLICY "Tenant Isolation: document_requirements" ON document_requirements
  FOR ALL USING (company_id = get_user_company_id());
