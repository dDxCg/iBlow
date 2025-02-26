const { google } = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(process.env.GOOGLE_KEY_FILE), // Đặt file JSON tại backend/
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// Lấy ảnh từ Google Drive
const getImagesFromDrive = async (pageSize = 20, pageToken = null) => {
  try {
    const query = "mimeType contains 'image/'";
    const response = await drive.files.list({
      q: query,
      fields: 'nextPageToken, files(id, name)',
      pageSize,
      pageToken,
    });

    const images = response.data.files.map((file) => ({
      id: file.id,
      previewURL: `https://drive.google.com/uc?id=${file.id}`,
    }));

    return { images, nextPageToken: response.data.nextPageToken };
  } catch (error) {
    console.error('❌ Lỗi khi lấy ảnh từ Drive:', error);
    throw error;
  }
};

module.exports = getImagesFromDrive;