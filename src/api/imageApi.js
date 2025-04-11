// src/api/imageApi.js

// Simulated API call for fetching the top K images
export async function getTopKImages(providerId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          'https://via.placeholder.com/150?text=Image1',
          'https://via.placeholder.com/150?text=Image2',
          'https://via.placeholder.com/150?text=Image3',
          'https://via.placeholder.com/150?text=Image4'
        ]);
      }, 800);
    });
  }
  
  // Simulated API call for fetching the output image
  export async function getOutputImage(providerId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://via.placeholder.com/300?text=Output+Image');
      }, 800);
    });
  }
  