// src/App.js
import React, { useState } from 'react';
import './App.css';
import InputSection from './components/InputSection';
import ImageDisplay from './components/ImageDisplay';
import { getTopKImages, getOutputImage } from './api/imageApi';

function App() {
  const [providerId, setProviderId] = useState('');
  const [topKImages, setTopKImages] = useState([]);
  const [outputImage, setOutputImage] = useState('');
  const [leftLoading, setLeftLoading] = useState(false);
  const [rightLoading, setRightLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError(''); 
    setLeftLoading(true);
    setRightLoading(true);
  
    try {
      // First API call (10 seconds)
      const similarImagesResponse = await getTopKImages(providerId);
      setTopKImages(similarImagesResponse.data.data.bestImages || []);
      // setTopKImages(['sdffs','fsafs','dd']);
      if(similarImagesResponse.data.success === false){
        setError(similarImagesResponse.data.message);
      }
      setLeftLoading(false);
    } catch (error) {
      console.error('Error fetching similar images:', error);
      setError('Error fetching similar images');
      setLeftLoading(false);
    }
  
    try {
      // Second API call (50 seconds)
      const finalImageResponse = await getOutputImage(providerId);
      setOutputImage(finalImageResponse);
      setRightLoading(false);
    } catch (error) {
      console.error('Error fetching final image:', error);
      setError('Error fetching final image');
      setRightLoading(false);
    }
  };
  

  return (
    <div className="container">
      <InputSection 
        providerId={providerId} 
        setProviderId={setProviderId} 
        onGenerate={handleGenerate}
        leftLoading={leftLoading}
        rightLoading={rightLoading}
      />
      {(leftLoading || rightLoading || topKImages.length > 0 || outputImage) && (
        <ImageDisplay 
          topKImages={topKImages} 
          outputImage={outputImage}
          leftLoading={leftLoading}
          rightLoading={rightLoading}
        />
      )}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
