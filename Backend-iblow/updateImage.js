// /backend/updateImage.js
const pool = require("./db");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { google } = require("googleapis");

// Configure Google Drive authentication
const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(process.env.GOOGLE_KEY_FILE),
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

/**
 * Updates an image with the edited version from Canva
 * @param {string} imageId - The Drive ID of the image to update
 * @param {string} exportUrl - The URL of the edited image from Canva
 * @returns {Promise<Object>} - The updated image data
 */
const updateImage = async (imageId, exportUrl) => {
  try {
    if (!imageId || !exportUrl) {
      throw new Error("Missing required parameters: imageId or exportUrl");
    }

    // 1. Download the image from the exportUrl
    const response = await fetch(exportUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    
    const buffer = await response.buffer();
    const tempFilePath = path.join(__dirname, `temp_${Date.now()}.jpg`);
    
    // Save temporarily to disk
    fs.writeFileSync(tempFilePath, buffer);

    // 2. Update the file in Google Drive
    const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(tempFilePath)
    };

    // Update the file in Drive
    await drive.files.update({
      fileId: imageId,
      media: media,
      fields: 'id, name, thumbnailLink'
    });

    // 3. Update thumbnail URL in database
    const newPreviewUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
    
    await pool.query(
      `UPDATE images 
       SET preview_url = $1, 
           updated_at = NOW() 
       WHERE drive_id = $2
       RETURNING *`,
      [newPreviewUrl, imageId]
    );

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    return { 
      success: true, 
      message: "Image updated successfully",
      imageId,
      previewUrl: newPreviewUrl
    };
  } catch (error) {
    console.error("❌ Error updating image:", error.message);
    throw error;
  }
};

module.exports = updateImage;