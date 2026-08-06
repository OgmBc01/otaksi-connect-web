CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS company_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    version VARCHAR(50) DEFAULT '1.0',
    is_public BOOLEAN DEFAULT FALSE,
    requires_auth BOOLEAN DEFAULT TRUE,
    download_password_hash VARCHAR(255),
    uploaded_by UUID,
    view_count INT DEFAULT 0,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_category ON company_documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON company_documents(created_at DESC);

CREATE TABLE IF NOT EXISTS document_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES company_documents(id) ON DELETE CASCADE,
    user_id UUID,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    action VARCHAR(50),
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE company_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_access_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS company_documents_select_authenticated ON company_documents;
CREATE POLICY company_documents_select_authenticated
ON company_documents
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS company_documents_insert_authenticated ON company_documents;
CREATE POLICY company_documents_insert_authenticated
ON company_documents
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS company_documents_update_authenticated ON company_documents;
CREATE POLICY company_documents_update_authenticated
ON company_documents
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS company_documents_delete_authenticated ON company_documents;
CREATE POLICY company_documents_delete_authenticated
ON company_documents
FOR DELETE
TO authenticated
USING (true);

DROP POLICY IF EXISTS document_access_logs_insert_authenticated ON document_access_logs;
CREATE POLICY document_access_logs_insert_authenticated
ON document_access_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS document_access_logs_select_authenticated ON document_access_logs;
CREATE POLICY document_access_logs_select_authenticated
ON document_access_logs
FOR SELECT
TO authenticated
USING (true);