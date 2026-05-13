DO $$
DECLARE
    v_company_id UUID;
    v_user_id UUID;
    v_customer_id UUID;
    v_vendor_id UUID;
    v_product_1 UUID;
    v_product_2 UUID;
    v_material_1 UUID;
    v_material_2 UUID;
    v_quote_id UUID;
    v_sales_order_id UUID;
BEGIN
    -- 1. Identify the user's company
    SELECT company_id INTO v_company_id FROM public.users LIMIT 1;
    SELECT id INTO v_user_id FROM public.users LIMIT 1;

    IF v_company_id IS NULL THEN
        RAISE EXCEPTION 'No company_id found. Run the orphan user fix first!';
    END IF;

    -- 2. Pick a random customer and vendor from their real list to use
    SELECT id INTO v_customer_id FROM customers WHERE company_id = v_company_id LIMIT 1;
    SELECT id INTO v_vendor_id FROM vendors WHERE company_id = v_company_id LIMIT 1;

    -- 3. Create Test Products
    INSERT INTO products (company_id, name, sku, status, standard_cost, sale_price, unit_of_measure)
    VALUES 
        (v_company_id, 'TEST 1g Premium Cartridge', 'TEST-CART-001', 'Active', 2.50, 15.00, 'unit') RETURNING id INTO v_product_1;
    
    INSERT INTO products (company_id, name, sku, status, standard_cost, sale_price, unit_of_measure)
    VALUES 
        (v_company_id, 'TEST 3.5g Infused Flower', 'TEST-FLWR-001', 'Active', 5.00, 25.00, 'unit') RETURNING id INTO v_product_2;

    -- 4. Create Test Materials
    INSERT INTO materials (company_id, name, sku, unit_of_measure)
    VALUES 
        (v_company_id, 'TEST Raw Distillate', 'TEST-MAT-DIST', 'g') RETURNING id INTO v_material_1;

    INSERT INTO materials (company_id, name, sku, unit_of_measure)
    VALUES 
        (v_company_id, 'TEST Glass Cartridge Hardware', 'TEST-MAT-HDW', 'unit') RETURNING id INTO v_material_2;

    -- 5. Add Inventory Quantities
    INSERT INTO inventory_items (company_id, item_type, product_id, material_id, quantity_on_hand, location)
    VALUES 
        (v_company_id, 'Product', v_product_1, NULL, 500, 'Vault A'),
        (v_company_id, 'Product', v_product_2, NULL, 250, 'Vault B'),
        (v_company_id, 'Material', NULL, v_material_1, 1000, 'Lab Fridge'),
        (v_company_id, 'Material', NULL, v_material_2, 5000, 'Warehouse 1');

    -- 6. Create a Test Pending Quote
    INSERT INTO quotes (company_id, quote_number, customer_id, status, total_amount, created_by)
    VALUES 
        (v_company_id, 'TEST-QT-0001', v_customer_id, 'Pending', 1500.00, v_user_id) RETURNING id INTO v_quote_id;

    INSERT INTO line_items (company_id, quote_id, product_id, description, quantity, unit_price, total_price)
    VALUES 
        (v_company_id, v_quote_id, v_product_1, 'TEST 1g Premium Cartridge', 100, 15.00, 1500.00);

    -- 7. Create a Test Sales Order (Ready for Fulfillment)
    INSERT INTO sales_orders (company_id, order_number, customer_id, status, total_amount, created_by)
    VALUES 
        (v_company_id, 'TEST-SO-0001', v_customer_id, 'Approved', 2500.00, v_user_id) RETURNING id INTO v_sales_order_id;

    INSERT INTO line_items (company_id, sales_order_id, product_id, description, quantity, unit_price, total_price)
    VALUES 
        (v_company_id, v_sales_order_id, v_product_2, 'TEST 3.5g Infused Flower', 100, 25.00, 2500.00);

END $$;
