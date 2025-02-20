// src/components/VacationCard.jsx
import PropTypes from "prop-types";

const VacationCard = ({ img, imgAlt, eyebrow, title, pricing, url }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300">
      <img className="rounded-lg w-full h-40 object-cover" src={img} alt={imgAlt} loading="lazy"/>
      <div className="mt-4">
        <div className="text-xs font-bold text-sky-500">{eyebrow}</div>
        <div className="mt-1 text-gray-700">
          <a href={url} className="hover:underline">
            {title}
          </a>
        </div>
        <div className="mt-2 text-sm font-bold text-gray-600">{pricing}</div>
      </div>
    </div>
  );
};

VacationCard.propTypes = {
  img: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pricing: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default VacationCard;
