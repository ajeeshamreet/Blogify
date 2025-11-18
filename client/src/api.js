import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : "https://foodify-server-1.onrender.com/api";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getUser = () => API.get("/auth/me");
export const logout = () => API.post("/auth/logout");
