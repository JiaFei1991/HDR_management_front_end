import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/HDRapi/v1',
  withCredentials: true
});

export default apiInstance;
