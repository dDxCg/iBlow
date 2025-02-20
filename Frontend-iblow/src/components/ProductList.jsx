import PropTypes from "prop-types";
import VacationCard from "./VacationCard";

const ProductList = ({ results }) => {
  return (
    <section className="px-8 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-bold text-gray-900">
          Birthday Decoration Service at Home | Plan the Perfect Party
        </h2>
      </div>

      {results.length === 0 ? (
        // Hiển thị thông báo khi không có kết quả
        <p className="text-center text-gray-500 mt-10">
          ❌ Không tìm thấy ảnh nào cho từ khóa này. Hãy thử từ khóa khác!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {results.map((item) => (
            <VacationCard
              key={item.id}
              img={item.previewURL}
              imgAlt={item.tags}
              eyebrow="Premium Decoration"
              title={item.tags}
              pricing="Starting from $49"
              url={item.previewURL}
            />
          ))}
        </div>
      )}
    </section>
  );
};

ProductList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      previewURL: PropTypes.string,
      tags: PropTypes.string,
      videos: PropTypes.shape({
        small: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }),
    })
  ).isRequired,
};

export default ProductList;
