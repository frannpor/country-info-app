import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 5000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
