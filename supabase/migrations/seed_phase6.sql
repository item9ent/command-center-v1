-- Seed Script for Phase 6 (Manufacturing Module)
-- Run this AFTER 20260512240000_manufacturing_schema.sql

-- 1. Create a Bill of Materials for Extract B (Assuming Extract B is a product)
INSERT INTO bill_of_materials (id, company_id, product_id, name, version, is_active)
SELECT 
  'f8d52c1e-7b3b-4a55-8292-6a4d2c88f1a1', -- Static BOM ID
  c.id, 
  p.id,
  'Premium Extract B Formulation',
  '1.0',
  true
FROM companies c
JOIN products p ON p.company_id = c.id AND p.name = 'Premium Extract B'
LIMIT 1;

-- 2. Add BOM Items (Ingredients)
-- Link Ethanol and Raw Biomass to the BOM
INSERT INTO bom_items (bom_id, material_id, quantity, unit_of_measure)
SELECT 
  'f8d52c1e-7b3b-4a55-8292-6a4d2c88f1a1',
  m.id,
  10.5, -- Requires 10.5 L of Ethanol per unit
  'Liters'
FROM materials m
WHERE m.name = 'Ethanol Solvent';

INSERT INTO bom_items (bom_id, material_id, quantity, unit_of_measure)
SELECT 
  'f8d52c1e-7b3b-4a55-8292-6a4d2c88f1a1',
  m.id,
  5.0, -- Requires 5.0 kg of Biomass per unit
  'kg'
FROM materials m
WHERE m.name = 'Raw Hemp Biomass';

-- 3. Create a Manufacturing Order (Batch Record)
INSERT INTO manufacturing_orders (id, company_id, product_id, bom_id, batch_number, status, target_quantity, start_date)
SELECT 
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  c.id,
  p.id,
  'f8d52c1e-7b3b-4a55-8292-6a4d2c88f1a1',
  'BATCH-2026-001',
  'Mixing',
  100, -- Target: 100 units of Extract B
  CURRENT_TIMESTAMP - INTERVAL '2 days'
FROM companies c
JOIN products p ON p.company_id = c.id AND p.name = 'Premium Extract B'
LIMIT 1;

-- 4. Record Material Consumption for the Batch
-- Assuming we pulled Ethanol from inventory
INSERT INTO manufacturing_order_materials (manufacturing_order_id, material_id, expected_quantity, actual_quantity_used, variance_reason)
SELECT 
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  m.id,
  1050, -- 100 * 10.5
  1060, -- Used a little more than expected
  'Slight spill during transfer'
FROM materials m
WHERE m.name = 'Ethanol Solvent';

-- Record Biomass consumption
INSERT INTO manufacturing_order_materials (manufacturing_order_id, material_id, expected_quantity, actual_quantity_used)
SELECT 
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  m.id,
  500, -- 100 * 5.0
  500 
FROM materials m
WHERE m.name = 'Raw Hemp Biomass';
