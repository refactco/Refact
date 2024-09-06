import React, { useEffect } from 'react';

const ClutchWidget = () => {
  useEffect(() => {
    // Check if the Clutch script is already present
    const existingScript = document.querySelector('script[src="https://widget.clutch.co/static/js/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://widget.clutch.co/static/js/widget.js';
      script.async = true;
      document.body.appendChild(script);

      // Cleanup if needed
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div
      className="clutch-widget"
      data-url="https://widget.clutch.co"
      data-widget-type="12"
      data-height="375"
      data-nofollow="true"
      data-expandifr="true"
      data-scale="100"
      data-primary-color="#20731A"
      data-secondary-color="#31A329"
      data-reviews="302856,301012,298239,297944,254224,240051,224527,216914,16556,3005,16426,15573"
      data-clutchcompany-id="1149819"
    ></div>
  );
};

export default ClutchWidget;
