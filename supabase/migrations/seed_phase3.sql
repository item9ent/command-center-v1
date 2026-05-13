-- Insert dummy data for Customers, Vendors, Inventory, and Orders

-- 1. Insert Customers
INSERT INTO customers (name, customer_type, status, sales_stage) VALUES 
  ('Apex Manufacturing', 'Wholesale', 'Active', 'Negotiation'),
  ('Zenith Retail Corp', 'Retail', 'Active', 'Closed Won'),
  ('Pioneer Extracts', 'Processing', 'Lead', 'Discovery');

-- 2. Insert Vendors
INSERT INTO vendors (name, vendor_type, status) VALUES 
  ('Uline Packaging', 'Supplies', 'Active'),
  ('Extracts Inc Wholesale', 'Raw Materials', 'Active');

-- 3. Insert Products/Materials
INSERT INTO products (name, sku, status, sale_price) VALUES 
  ('Premium Glass Jars 30ml', 'PKG-001', 'Active', 1.50),
  ('Hemp Extract Blend B', 'EXT-042', 'Active', 450.00),
  ('Organic MCT Oil', 'RAW-011', 'Active', 12.00);

-- 4. Insert Quotes
-- We'll link to the first customer (Apex) and second (Zenith)
INSERT INTO quotes (customer_id, quote_number, status, total_amount)
SELECT id, 'QT-1042', 'Pending', 45000.00 FROM customers WHERE name = 'Apex Manufacturing';

INSERT INTO quotes (customer_id, quote_number, status, total_amount)
SELECT id, 'QT-1043', 'Pending', 12500.00 FROM customers WHERE name = 'Zenith Retail Corp';

-- 5. Insert Sales Orders
INSERT INTO sales_orders (customer_id, order_number, status, total_amount)
SELECT id, 'SO-1090', 'Processing', 12400.00 FROM customers WHERE name = 'Apex Manufacturing';

INSERT INTO sales_orders (customer_id, order_number, status, total_amount)
SELECT id, 'SO-1091', 'Pending', 4250.00 FROM customers WHERE name = 'Zenith Retail Corp';

INSERT INTO sales_orders (customer_id, order_number, status, total_amount)
SELECT id, 'SO-1092', 'Cancelled', 8900.00 FROM customers WHERE name = 'Pioneer Extracts';

-- 6. Insert Purchase Orders
INSERT INTO purchase_orders (vendor_id, po_number, status, total_amount)
SELECT id, 'PO-5014', 'Approved', 12500.00 FROM vendors WHERE name = 'Uline Packaging';

INSERT INTO purchase_orders (vendor_id, po_number, status, total_amount)
SELECT id, 'PO-5015', 'Submitted', 5000.00 FROM vendors WHERE name = 'Extracts Inc Wholesale';
