CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    drive_id VARCHAR(255) UNIQUE NOT NULL, -- ID của ảnh trên Google Drive
    name VARCHAR(255),                     -- Tên ảnh
    preview_url TEXT,                      -- Link preview
    folder_id VARCHAR(255),                -- ID của folder chứa ảnh
    tags TEXT[],                            -- Danh sách tags (dùng kiểu array)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);