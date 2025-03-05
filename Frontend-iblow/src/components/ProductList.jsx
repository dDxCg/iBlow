import PropTypes from "prop-types";
import VacationCard from "./VacationCard";
import { useState } from "react";

const ProductList = ({ results }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="px-8 py-6">
      <div className="flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What will your celebration look like?
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          iBlow Global makes it easy to create stunning balloon designs, estimate supplies, and order pro balloons – all in one place.
        </p>
      </div>

      {results.length === 0 ? (
        // Hiển thị thông báo khi không có kết quả
        <p className="text-center text-gray-500 mt-10">
          ❌ Không tìm thấy ảnh nào cho từ khóa này. Hãy thử từ khóa khác!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {results.map((item) => (
            <div key={item.drive_id} onClick={() => setSelectedImage(item.preview_url)}>
              <VacationCard
                key={item.drive_id}
                id={item.drive_id}
                img={item.preview_url}
                imgAlt={item.tags ? item.tags.join(', ') : item.name}
                title={item.name || (item.tags && item.tags.join(', '))}
                url={item.preview_url}
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
};

ProductList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      drive_id: PropTypes.string.isRequired,
      name: PropTypes.string,
      preview_url: PropTypes.string.isRequired,
      tags: PropTypes.array,
    })
  ).isRequired,
};

export default ProductList;