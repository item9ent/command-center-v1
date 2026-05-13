-- Add direct inventory tracking columns to simplify the MVP

ALTER TABLE materials ADD COLUMN IF NOT EXISTS quantity_on_hand DECIMAL(12, 2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity_on_hand DECIMAL(12, 2) DEFAULT 0;
