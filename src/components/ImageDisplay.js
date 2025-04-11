// src/components/ImageDisplay.js
import React from 'react';
import Lottie from 'lottie-react';
// You'll need to import your loading animation JSON file

function ImageDisplay({ topKImages, outputImage, isLoading }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: "/loading_lottie_2.json", // This path is relative to the public folder
  };

  return (
    <div className="images-section">
      {/* Left side: Grid of top K images */}
      <div className="left-images-container">
        {topKImages.map((imgUrl, index) => (
          <img key={index} src={"/test.jpeg"} alt={`Top image ${index + 1}`} />
        ))}
      </div>

      {/* Center: Arrow indicating transformation */}
      <div className="arrow">
        <span>➡️</span>
      </div>

      {/* Right side: Output image */}
      <div className="right-image-container">
        {isLoading ? (
          <Lottie 
            {...defaultOptions}
            style={{ width: 200, height: 200 }} // Adjust size as needed
          />
        ) : (
          outputImage && <img src={"/test.jpeg"} alt="Output" />
        )}
      </div>
    </div>
  );
}

export default ImageDisplay;
