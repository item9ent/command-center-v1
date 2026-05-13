-- Phase 7: Hardening & Row Level Security (RLS)
-- This script locks down the database so authenticated users can only access data belonging to their specific company.

-- 1. Create a helper function to get the current user's company_id securely
CREATE OR REPLACE FUNCTION get_user_company_id()
RETURNS UUID AS $$
  SELECT company_id FROM public.users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Enable RLS on all primary tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE notes_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE bill_of_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bom_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturing_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturing_order_materials ENABLE ROW LEVEL SECURITY;

-- 3. Define the standard RLS Policy for tables with a company_id column
-- We will use a DO block to generate the standard policies programmatically for brevity in the script
DO $$
DECLARE
    t_name text;
    tables_with_company_id text[] := ARRAY[
        'roles', 'users', 'customers', 'vendors', 'contacts', 
        'products', 'materials', 'inventory_items', 'notes_communications', 
        'documents', 'activity_logs', 'tasks', 'alerts', 'approval_requests', 
        'quotes', 'sales_orders', 'purchase_orders', 'line_items', 
        'bill_of_materials', 'manufacturing_orders'
    ];
BEGIN
    FOREACH t_name IN ARRAY tables_with_company_id
    LOOP
        EXECUTE format('
            CREATE POLICY "Tenant Isolation: Select %I" ON %I FOR SELECT USING (company_id = get_user_company_id());
            CREATE POLICY "Tenant Isolation: Insert %I" ON %I FOR INSERT WITH CHECK (company_id = get_user_company_id());
            CREATE POLICY "Tenant Isolation: Update %I" ON %I FOR UPDATE USING (company_id = get_user_company_id());
            CREATE POLICY "Tenant Isolation: Delete %I" ON %I FOR DELETE USING (company_id = get_user_company_id());
        ', t_name, t_name, t_name, t_name, t_name, t_name, t_name, t_name);
    END LOOP;
END
$$;

-- 4. Special Policies for tables without a direct company_id (or requiring special logic)

-- A user can see their own company record
CREATE POLICY "Users can view their own company" ON companies
  FOR SELECT USING (id = get_user_company_id());

-- document_links (relies on the parent document's company_id)
CREATE POLICY "Tenant Isolation: document_links" ON document_links
  FOR ALL USING (
    document_id IN (SELECT id FROM documents WHERE company_id = get_user_company_id())
  );

-- permissions (relies on role's company_id)
CREATE POLICY "Tenant Isolation: permissions" ON permissions
  FOR ALL USING (
    role_id IN (SELECT id FROM roles WHERE company_id = get_user_company_id())
  );

-- bom_items (relies on bom's company_id)
CREATE POLICY "Tenant Isolation: bom_items" ON bom_items
  FOR ALL USING (
    bom_id IN (SELECT id FROM bill_of_materials WHERE company_id = get_user_company_id())
  );

-- manufacturing_order_materials (relies on order's company_id)
CREATE POLICY "Tenant Isolation: manufacturing_order_materials" ON manufacturing_order_materials
  FOR ALL USING (
    manufacturing_order_id IN (SELECT id FROM manufacturing_orders WHERE company_id = get_user_company_id())
  );

-- 5. Final Storage Bucket Security (if using Supabase Storage for Documents)
-- To be run manually in Supabase Dashboard -> Storage -> Policies, but provided here as reference:
-- CREATE POLICY "Users can access documents for their company" ON storage.objects
--   FOR ALL USING (bucket_id = 'documents' AND auth.uid() IN (SELECT id FROM users));
