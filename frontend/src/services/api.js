// frontend/src/services/api.js
import axios from "axios";

// Create an Axios instance with a default base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // Adjust port as needed
});

// Example: GET request for fetching data
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API GET error:", error);
    throw error;
  }
};

// Example: POST request for sending data
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("API POST error:", error);
    throw error;
  }
};

export default api;
