import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isLoginPage = window.location.pathname === "/login";

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isLoginPage) {
        return Promise.reject(error);
      }

      const refreshToken = sessionStorage.getItem("refresh");

      if (!refreshToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${apiUrl}/user/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        sessionStorage.setItem("access", newAccessToken);

        const level = localStorage.getItem("level");
        if (level === "one") {
          redirectToLogin();
          return Promise.reject("User level not authorized");
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      if (!isLoginPage) {
        redirectToLogin();
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

function redirectToLogin() {
  sessionStorage.removeItem("access");
  sessionStorage.removeItem("refresh");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

export default apiClient;
