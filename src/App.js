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
  const [isLoading, setIsLoading] = useState(false); // Add this state

  const handleGenerate = async () => {

    if (!providerId.trim()) {
      alert('Please enter a Provider ID');
      return;
    }

    // Clear the previous images
    setTopKImages([]);
    setOutputImage('');
    setIsLoading(true); // Set loading to true when starting the request
    try {
      // Fetch the top K images and output image from the API
      const fetchedTopKImages = await getTopKImages(providerId);
      setTopKImages(fetchedTopKImages);

      const fetchedOutputImage = await getOutputImage(providerId);
      setOutputImage(fetchedOutputImage);
    } catch (error) {
      console.error('Error fetching images:', error);
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
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
