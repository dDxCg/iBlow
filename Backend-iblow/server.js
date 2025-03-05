const express = require("express");
const cors = require("cors");
require("dotenv").config();
const getImagesByTag = require("./getImagesByTags");
const updateImage = require("./updateImage");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Add middleware to parse JSON bodies

// Get images by tag
app.get("/api/images", async (req, res) => {
  try {
    const searchTag = req.query.tag;

    if (!searchTag) {
      return res.status(400).json({ error: "Thiếu tham số tag" });
    }

    const images = await getImagesByTag(searchTag);

    if (images.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy ảnh nào." });
    }

    res.json(images);
  } catch (error) {
    console.error("❌ Lỗi khi xử lý yêu cầu:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Update image with edited version from Canva
app.post("/api/images/update", async (req, res) => {
  try {
    const { imageId, exportUrl } = req.body;

    if (!imageId || !exportUrl) {
      return res.status(400).json({ error: "Missing required fields: imageId or exportUrl" });
    }

    const result = await updateImage(imageId, exportUrl);
    res.json(result);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật ảnh:", error);
    res.status(500).json({ error: "Lỗi server khi cập nhật ảnh" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});