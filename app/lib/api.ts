const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://photo-restorer-production.up.railway.app";

export { API_BASE_URL };
