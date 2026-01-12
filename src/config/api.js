const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const buildApiUrl = (path) => {
  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};
