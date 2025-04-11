// src/api/imageApi.js

// Import axios
import axios from 'axios';

const BASE_URL = 'http://09cb-165-85-55-93.ngrok-free.app/provider-training-service/professional';
const TOP_K_ENDPOINT = `${BASE_URL}/generateProfessionalImageForProviderId`;
const OUTPUT_ENDPOINT = `${BASE_URL}/generateProfessionalImageForProviderId`;

// const OUTPUT_ENDPOINT = `${BASE_URL}/getGeneratedImage`;

// Configure axios defaults
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
};

// Get top K images from the API
export async function getTopKImages(providerId) {
  try {
    console.log("providerId", providerId);
    const response = await axios.post(TOP_K_ENDPOINT, {
      providerId: providerId
    }, axiosConfig);
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
    const response = await axios.post(OUTPUT_ENDPOINT, {
      providerId: providerId
    }, axiosConfig);
    console.log("response", response);
    return response.data.outputImage || '';
  } catch (error) {
    console.error('Error fetching output image:', error);
    throw error;
  }
}
  