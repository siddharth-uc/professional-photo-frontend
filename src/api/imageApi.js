// src/api/imageApi.js

// Import axios
import axios from 'axios';

const BASE_URL = 'https://b2c3-165-85-55-93.ngrok-free.app/provider-training-service/professional';
const TOP_K_ENDPOINT = `${BASE_URL}/getTopKImagesForProviderId`;
const OUTPUT_ENDPOINT = `${BASE_URL}/generateProfessionalImageForProviderId`;

// Get top K images from the API
export async function getTopKImages(providerId) {
  try {
    const response = await axios.get(`${TOP_K_ENDPOINT}?providerId=${providerId}`);
    console.log("response", response);
    return response.data.topKImages || [];
  } catch (error) {
    console.error('Error fetching top K images:', error);
    throw error;
  }
}

// Get output image from a separate API endpoint
export async function getOutputImage(providerId) {
  try {
    const response = await axios.get(`${OUTPUT_ENDPOINT}?providerId=${providerId}`);
    console.log("response", response);
    return response.data.outputImage || '';
  } catch (error) {
    console.error('Error fetching output image:', error);
    throw error;
  }
}
  