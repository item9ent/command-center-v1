-- Phase 12: Work-in-Progress (WIP) Tracking Columns

ALTER TABLE manufacturing_orders
ADD COLUMN wet_mix_available_qty DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN dry_material_available_qty DECIMAL(10, 2) DEFAULT 0;

-- Reset our dummy batches from Phase 11 so they show up correctly in the new pipeline
UPDATE manufacturing_orders
SET status = 'Processing',
    wet_mix_available_qty = 30.00 -- 30kg of wet mix waiting for a Drying Tech
WHERE batch_number = 'BATCH-DRY-002';

UPDATE manufacturing_orders
SET status = 'Processing',
    dry_material_available_qty = 1.50 -- 1.5kg of dry material waiting for a Grinder
WHERE batch_number = 'BATCH-GRIND-003';
