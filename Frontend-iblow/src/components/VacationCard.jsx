// /frontend/src/components/VacationCard.jsx
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { editWithCanva } from '../utils/canvaConfig';

const VacationCard = ({ img, imgAlt, title, id }) => {
  const handleEditWithCanva = (e) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    editWithCanva(img, async (exportUrl) => {
      // Handle the edited image URL - this will be called after publishing in Canva
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/images/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageId: id,
            exportUrl,
          }),
        });
        
        if (response.ok) {
          console.log('Successfully saved edited image');
          // Optionally refresh the page or update the UI
          window.location.reload();
        } else {
          console.error('Failed to save edited image');
        }
      } catch (error) {
        console.error('Error saving edited image:', error);
      }
    });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={img}
          alt={imgAlt}
        />
        <button
          onClick={handleEditWithCanva}
          className="absolute bottom-4 right-4 bg-[#D4AF37] text-white p-2 rounded-full shadow-md hover:bg-[#b89a30] transition-colors flex items-center gap-1"
        >
          <FiEdit className="text-lg" />
          <span>Edit with Canva</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-lg">{title}</h3>
      </div>
    </div>
  );
};

VacationCard.propTypes = {
  img: PropTypes.string.isRequired,
  imgAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default VacationCard;