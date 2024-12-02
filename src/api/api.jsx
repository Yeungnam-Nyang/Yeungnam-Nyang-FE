import axios from "axios";
import https from "https"
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  httpAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

//요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
    //
  },
  (error) => {
    return Promise.reject(error);
  }
);

//응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.data.error === "INVALID_TOKEN") {
      try {
        //새로 발급받은 access token으로 요청
        const newAccessToken = await refreshToken();
        localStorage.setItem("token", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");

        alert("재 로그인 해주세요.");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  const response = await api.post("/refresh-token", { token: refreshToken });
  return response.data.accessToken;
};

export default api;
