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
    setTopKImages([]);
    setOutputImage('');

    try {
      // First API call (10 seconds)
      const similarImagesResponse = await getTopKImages(providerId);
      setTopKImages(similarImagesResponse?.data.data?.bestImages || []);
  
      // setTopKImages(['sdffs','fsafs','dd']);
      console.log("testoing:",similarImagesResponse.data);
      if(similarImagesResponse.data.success === false){
        setError(similarImagesResponse.data.message);
      }
      setLeftLoading(false);
    } catch (error) {
      console.error('Error fetching similar images:', error);
      setError('Error fetching images!');
      setLeftLoading(false);
    }
  
    try {
      // Second API call (50 seconds)
      const finalImageResponse = await getOutputImage(providerId);
      setOutputImage(finalImageResponse.data?.data?.professionalImage || '');
      if(finalImageResponse.data.success === false){
        setError(finalImageResponse.data.message);
      }
      setRightLoading(false);
    } catch (error) {
      // console.error('Error fetching final image:', error);
      // setError('Error fetching final image');
      // setRightLoading(false);
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
      <div className="example-ids">
       Sample Provider Ids (click any id to fill): <span className="example-id" onClick={() => setProviderId('660ed20c3a313a002445d58c')}>660ed20c3a313a002445d58c</span>, 
        <span className="example-id" onClick={() => setProviderId('66a863ac0714440024be9e18')}>66a863ac0714440024be9e18</span>, 
        <span className="example-id" onClick={() => setProviderId('67e052634694040025e213db')}>67e052634694040025e213db</span>,
        <span className="example-id" onClick={() => setProviderId('67c6dc87809f860021b340f1')}>67c6dc87809f860021b340f1</span>, 
        <span className="example-id" onClick={() => setProviderId('675fb26f2031d6002310f6a7')}>675fb26f2031d6002310f6a7</span>, 
        <span className="example-id" onClick={() => setProviderId('6696950a2a206200241372df')}>6696950a2a206200241372df</span>, 
        <span className="example-id" onClick={() => setProviderId('664efeb8660ef200248c1c37')}>664efeb8660ef200248c1c37</span> 
        <span className="example-id" onClick={() => setProviderId('644e4c11a4abe70024e381b6')}>644e4c11a4abe70024e381b6</span> 
      </div>
      <p style={{ fontSize: '10.67px' }}>
        *For trying on other partners, copy <code>provider_id</code> from{' '}
        <a href="https://ops.urbanclap.com/provider" target="_blank" rel="noopener noreferrer">
          https://ops.urbanclap.com/provider
        </a>{' '}
        site after adding "Approved" status filter.
      </p>
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
