import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn("[api] VITE_API_BASE_URL no está definida. Revisá tu archivo .env");
}

export const buildApiUrl = (path) => {
  const base = (API_BASE_URL || "").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL || "",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("dk_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("dk_token");
      localStorage.removeItem("dk_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
