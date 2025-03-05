// /frontend/src/components/CanvaCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CanvaCallback = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract design data from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const designId = urlParams.get('designId');
    const exportUrl = urlParams.get('exportUrl');
    const imageId = urlParams.get('imageId');

    if (designId && exportUrl) {
      // Save the edited image
      const saveEditedImage = async () => {
        try {
          // Call your API to save the edited image
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/images/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageId,
              designId,
              exportUrl,
            }),
          });

          if (response.ok) {
            console.log('Successfully saved edited image');
            // Redirect back to the main page
            navigate('/');
            if (onComplete) onComplete();
          } else {
            console.error('Failed to save edited image');
          }
        } catch (error) {
          console.error('Error saving edited image:', error);
        }
      };

      saveEditedImage();
    } else {
      // If there's no design data, just go back to the main page
      navigate('/');
    }
  }, [navigate, onComplete]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing your design...</h2>
        <p className="text-gray-600">Please wait while we save your changes</p>
      </div>
    </div>
  );
};

CanvaCallback.propTypes = {
  onComplete: PropTypes.func,
};

export default CanvaCallback;