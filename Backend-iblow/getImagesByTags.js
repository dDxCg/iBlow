const pool = require("./db");

const getImagesByTag = async (tag) => {
  try {
    if (!tag || typeof tag !== "string") {
      console.warn("⚠️ Tag không hợp lệ:", tag);
      return [];
    }

    const query = `
      SELECT drive_id, name, preview_url FROM images
      WHERE LOWER(tags::text) LIKE LOWER($1)
    `;

    // Chuyển đổi tag thành một mảng đúng định dạng cho PostgreSQL
    // const formattedTag = `{${tag}}`;
    const formattedTag = `%${tag}%`;

    const { rows } = await pool.query(query, [formattedTag]);
    return rows;
  } catch (error) {
    console.error("❌ Lỗi khi tìm ảnh theo tag:", error.message);
    return [];
  }
};

module.exports = getImagesByTag;


