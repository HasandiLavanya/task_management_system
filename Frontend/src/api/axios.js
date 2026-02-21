import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // NOTE: include /api here
});

// Attach JWT token from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // we'll store 'access' here
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;