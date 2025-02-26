const express = require("express");
const cors = require("cors");
require("dotenv").config();
const getImagesByTag = require("./getImagesByTags");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});

