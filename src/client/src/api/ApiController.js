import axios from "axios";

const apiController = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

apiController.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${localStorage?.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

apiController.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    if (err.response && err.response.status === 401) {
      try {
        await refreshAccessToken();
        return apiController.request(originalConfig);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axios({
      url: import.meta.env.VITE_BACKEND_API + "/api/token/refresh",
      method: "POST",
      data: { refresh: localStorage.getItem("refreshToken") },
    });

    localStorage.setItem("accessToken", response.data.access);
  } catch (e) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location("/");
  }
};

export default apiController;
