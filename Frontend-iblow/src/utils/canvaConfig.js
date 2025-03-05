// /frontend/src/utils/canvaConfig.js
const CANVA_CLIENT_ID = import.meta.env.VITE_CANVA_CLIENT_ID;
const CANVA_APP_ID = import.meta.env.VITE_CANVA_APP_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || window.location.origin + '/canva-callback';

// Variable to track if SDK is loaded
let canvaSdkLoaded = false;

// Canva API configuration
export const canvaConfig = {
  clientId: CANVA_CLIENT_ID,
  appId: CANVA_APP_ID,
  redirectUri: REDIRECT_URI,
  scopes: ['design:read', 'design:write', 'media:read', 'media:write'],
};

// Initialize Canva SDK with callback when loaded
export const initCanva = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.canva.com/designbutton/v2/design-button.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Canva SDK loaded successfully');
      canvaSdkLoaded = true;
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Canva SDK');
      reject(new Error('Failed to load Canva SDK'));
    };
    
    document.body.appendChild(script);
  });
};

// Check if SDK is loaded or wait for it
const ensureSdkLoaded = async () => {
  if (window.Canva && canvaSdkLoaded) {
    return true;
  }
  
  // Wait for SDK to load (with timeout)
  let retries = 0;
  while (!window.Canva && retries < 10) {
    await new Promise(resolve => setTimeout(resolve, 500));
    retries++;
  }
  
  if (!window.Canva) {
    throw new Error('Canva SDK could not be loaded');
  }
  
  return true;
};

// Open Canva editor with the image
export const editWithCanva = async (imageUrl, onDesignComplete) => {
  try {
    await ensureSdkLoaded();
    const canva = window.Canva;
    
    // Configuration for the design session
    const designConfig = {
      design: {
        type: 'Graphic',
        dimensions: {
          width: 1200,
          height: 800,
        },
      },
      onDesignOpen: () => {
        console.log('Design opened in Canva editor');
      },
      onDesignPublish: async (designId, exportUrl) => {
        console.log('Design published', designId, exportUrl);
        if (onDesignComplete && typeof onDesignComplete === 'function') {
          await onDesignComplete(exportUrl);
        }
      },
      onDesignClose: () => {
        console.log('Design editor closed');
      },
    };

    // If we have an image URL, load it as a background
    if (imageUrl) {
      designConfig.design.importImage = imageUrl;
    }

    // Open the Canva editor
    canva.openDesigner(designConfig);
  } catch (error) {
    console.error('Error opening Canva editor:', error);
    alert('Unable to load Canva editor. Please try again later.');
  }
};