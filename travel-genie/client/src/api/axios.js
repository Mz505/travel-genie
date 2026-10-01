import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ensure relative URLs don't have leading slash that would strip /api/
    if (config.url && config.url.startsWith("/")) {
      config.url = config.url.substring(1);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Seamlessly handle token refresh on 401 Unauthorized
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refreshing if this was the login or refresh request itself
    if (
      originalRequest?.url?.includes("token/") ||
      originalRequest?.url?.includes("token/refresh/")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        isRefreshing = false;
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        if (window.location.pathname.startsWith("/dashboard")) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/token/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } },
        );

        const newAccessToken = response.data?.access;

        if (newAccessToken) {
          localStorage.setItem("access", newAccessToken);

          if (response.data.refresh) {
            localStorage.setItem("refresh", response.data.refresh);
          }

          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          isRefreshing = false;

          return api(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        if (window.location.pathname.startsWith("/dashboard")) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
