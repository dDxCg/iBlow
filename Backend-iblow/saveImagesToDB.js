const { google } = require("googleapis");
require("dotenv").config();
const pool = require("./db");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(process.env.GOOGLE_KEY_FILE),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

const FOLDER_ID = process.env.FOLDER_ID; // ID thư mục gốc

// 📂 Đệ quy lấy danh sách tất cả thư mục con
async function getSubfolders(parentId, parentTags = []) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id, name, parents)",
  });

  let folders = res.data.files.map(folder => ({
    id: folder.id,
    name: folder.name,
    tags: [...parentTags, folder.name], // Gộp tags từ cha và chính nó
  }));

  for (const folder of folders) {
    const subfolders = await getSubfolders(folder.id, folder.tags);
    folders = folders.concat(subfolders);
  }

  return folders;
}

// 📸 Lấy ảnh trong thư mục & gán tags
async function getImagesFromFolder(folderId, tags) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/'`,
    fields: "files(id, name, parents)",
  });

  return res.data.files.map(file => ({
    id: file.id, // ✅ Sử dụng đúng tên ID
    name: file.name,
    tags: tags, // Thêm tags từ thư mục chứa ảnh
    preview_url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`, // ✅ Đổi 'url' thành 'preview_url'
  }));
}

// 🚀 Lưu ảnh vào database
async function saveImagesToDB() {
  console.log("🚀 Đang thu thập ảnh từ Google Drive...");

  const folders = await getSubfolders(FOLDER_ID);
  let allImages = [];

  for (const folder of folders) {
    const images = await getImagesFromFolder(folder.id, folder.tags);
    allImages = allImages.concat(images);
  }

  if (allImages.length === 0) {
    console.log("⚠️ Không có ảnh nào để lưu vào database.");
    return;
  }

  // ✅ Chèn dữ liệu vào PostgreSQL
  for (const img of allImages) {
    await pool.query(
      `INSERT INTO images (drive_id, name, tags, preview_url)
       VALUES ($1, $2, $3::TEXT[], $4)
       ON CONFLICT (drive_id) DO NOTHING`, // ✅ Tránh chèn trùng ảnh
      [img.id, img.name, img.tags, img.preview_url]
    );
  }
  console.log(`✅ Đã lưu ${allImages.length} ảnh vào database.`);
}

saveImagesToDB();
