// src/components/ImageDisplay.js
import React from 'react';
import Lottie from 'lottie-react';
// You'll need to import your loading animation JSON file

function ImageDisplay({ topKImages, outputImage, leftLoading, rightLoading }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: "/loading_lottie_2.json",
  };

  return (
    <div className="images-section">
      {/* Left side: Grid of top K images */}
      <div className="left-images-container">
        {leftLoading ? (
          <Lottie 
            {...defaultOptions}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          topKImages.map((imgUrl, index) => (
            <img key={index} src={imgUrl} alt={`Top image ${index + 1}`} />
          ))
        )}
      </div>

      {/* Center: Arrow indicating transformation */}
      <div className="arrow">
        <span>➡️</span>
      </div>

      {/* Right side: Output image */}
      <div className="right-image-container">
        {rightLoading ? (
          <Lottie 
            {...defaultOptions}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          outputImage && <img src={outputImage} alt="Output" />
        )}
      </div>
    </div>
  );
}

export default ImageDisplay;
