-- 1. Create the public bucket for COAs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('coas', 'coas', true) 
ON CONFLICT (id) DO NOTHING;

-- 2. Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'coas');

-- 3. Allow authenticated users to modify files
CREATE POLICY "Allow authenticated modifications" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'coas');

-- 4. Allow authenticated users to delete files
CREATE POLICY "Allow authenticated deletes" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'coas');

-- 5. Allow public to read/download files (CRITICAL for QR Codes)
CREATE POLICY "Allow public read access" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'coas');
