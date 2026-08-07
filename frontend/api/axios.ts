import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // important if you're using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;