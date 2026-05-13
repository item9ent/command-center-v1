-- Phase 11 Seed Data

-- Create some manufacturing orders in different stages
INSERT INTO manufacturing_orders (company_id, product_id, batch_number, target_quantity, status, start_date)
SELECT c.id, p.id, 'BATCH-MIX-001', 100, 'Mixing', CURRENT_DATE
FROM companies c
JOIN products p ON p.company_id = c.id
LIMIT 1;

INSERT INTO manufacturing_orders (company_id, product_id, batch_number, target_quantity, status, start_date)
SELECT c.id, p.id, 'BATCH-DRY-002', 150, 'Drying', CURRENT_DATE - INTERVAL '1 day'
FROM companies c
JOIN products p ON p.company_id = c.id
LIMIT 1;

INSERT INTO manufacturing_orders (company_id, product_id, batch_number, target_quantity, status, start_date)
SELECT c.id, p.id, 'BATCH-GRIND-003', 200, 'Grinding', CURRENT_DATE - INTERVAL '2 days'
FROM companies c
JOIN products p ON p.company_id = c.id
LIMIT 1;
