-- MVP Phase 4: Documents and AI Schema

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  
  -- The physical file in Supabase Storage
  name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL, -- The path within the 'documents' storage bucket
  file_type VARCHAR(100),
  size_bytes BIGINT,
  
  -- The user who uploaded it
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Optional linking to other records (e.g. attaching a PDF to a Purchase Order)
  related_record_type VARCHAR(100),
  related_record_id UUID,
  
  -- AI Integration
  ai_summary TEXT, -- Stores the AI generated summary of the document
  is_processed_by_ai BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
