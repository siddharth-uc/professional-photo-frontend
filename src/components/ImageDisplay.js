// src/components/ImageDisplay.js
import React from 'react';
import Lottie from 'lottie-react';

function ImageDisplay({ topKImages, outputImage, leftLoading, rightLoading }) {


  return (
    <div className="images-section">
      {/* Left side: Grid of top K images */}
      <div className="left-images-container">
         {leftLoading ? (
           <Lottie 
             animationData={require('./hands_lottie.json')}
             loop={true}
             style={{ width: 200, height: 200 }} // Adjust size as needed
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
            animationData={require('./hands_lottie.json')}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          outputImage && <img src={`data:image/jpeg;base64,${outputImage}`} alt="Output" />
        )}
      </div>
    </div>
  );
}

export default ImageDisplay;
