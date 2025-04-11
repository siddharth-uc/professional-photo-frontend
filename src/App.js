// src/App.js
import React, { useState } from 'react';
import './App.css';
import InputSection from './components/InputSection';
import ImageDisplay from './components/ImageDisplay';
import { getTopKImages, getOutputImage } from './api/imageApi';

function App() {
  const [providerId, setProviderId] = useState('');
  const [topKImages, setTopKImages] = useState([]);
  const [outputImage, setOutputImage] = useState('vfev');
  const [leftLoading, setLeftLoading] = useState(false);
  const [rightLoading, setRightLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      // Start both loading states
      setLeftLoading(true);
      setRightLoading(true);

      // // First API call (10 seconds)
      const similarImagesResponse = await getTopKImages(providerId);
      setTopKImages(similarImagesResponse);

      // // Second API call (50 seconds)
      const finalImageResponse = await getOutputImage(providerId);
      setOutputImage(finalImageResponse);
    } catch (error) {
      console.error('Error:', error);
      setLeftLoading(false);
      setRightLoading(false);
    }
  };

  return (
    <div className="container">
      <InputSection 
        providerId={providerId} 
        setProviderId={setProviderId} 
        onGenerate={handleGenerate}
      />
      <ImageDisplay 
        topKImages={topKImages} 
        outputImage={outputImage}
        leftLoading={leftLoading}
        rightLoading={rightLoading}
      />
    </div>
  );
}

export default App;
