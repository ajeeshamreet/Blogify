import axios from "axios";

// const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:8080/api"
//     : "https://blogify-9ljq.onrender.com/api";

export const API = axios.create({
  baseURL: 'https://blogify-9ljq.onrender.com/api',
  withCredentials: true,
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getUser = () => API.get("/auth/me");
export const logout = () => API.post("/auth/logout");
