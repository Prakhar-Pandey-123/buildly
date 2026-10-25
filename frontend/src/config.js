const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const BACKEND_URL = backendUrl?.replace(/\/+$/, "");
// export const BACKEND_URL = "http://localhost:3000";    