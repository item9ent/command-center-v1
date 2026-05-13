-- Insert dummy data for Tasks and Alerts so the dashboard isn't empty!

-- 1. Insert Tasks
INSERT INTO tasks (title, description, status, priority, due_date)
VALUES 
  ('Review Apex Contract terms', 'Check the net-30 terms and SLA guarantees.', 'Open', 'High', CURRENT_TIMESTAMP + INTERVAL '1 day'),
  ('Approve PO for Premium Glass Jars', 'Vendor is waiting on approval for $12k order.', 'Open', 'Urgent', CURRENT_TIMESTAMP),
  ('Investigate Extract B yield drop', 'Production reported a 5% loss in the latest batch.', 'Open', 'Normal', CURRENT_TIMESTAMP + INTERVAL '2 days'),
  ('Quarterly Marketing Budget', 'Finalize Q3 ad spend allocation.', 'Open', 'Low', CURRENT_TIMESTAMP + INTERVAL '5 days'),
  ('Follow up with Pioneer Extracts', 'Check if they received the sample shipment.', 'Completed', 'Normal', CURRENT_TIMESTAMP - INTERVAL '1 day');

-- 2. Insert Alerts
INSERT INTO alerts (type, message, is_urgent, status)
VALUES
  ('Inventory Low', 'Hemp Extract Blend B is below reorder point (Current: 12kg, Reorder: 15kg).', true, 'Active'),
  ('Production Flag', 'Batch #B-9902 yield is 5% below expected standard.', false, 'Active'),
  ('Compliance', 'Facility License requires renewal in 30 days.', false, 'Active');

-- 3. Insert Approval Requests
INSERT INTO approval_requests (type, status, amount, justification, related_record_type, related_record_id)
VALUES
  ('Quote #1042 - Bulk Order', 'Pending', 45000.00, 'Discount is 12% below standard margin to secure the client.', 'Quote', uuid_generate_v4()),
  ('PO-5014 - New Equipment', 'Pending', 12500.00, 'Needed for the new extraction line. Over auto-approval limit.', 'PurchaseOrder', uuid_generate_v4());
