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
  function (err) {
    const originalConfig = err.config;
    if (err.response && err.response.data.status === "401 Unauthorized") {
      try {
        axios.defaults.headers.common["refresh-token"] =
          localStorage.getItem("refreshToken");
        refreshAccessToken();
        return apiController.request(originalConfig);
      } catch (err) {
        console.log("error", err.response);
        window.location.href = "/";
      }
    }
    return Promise.reject(err);
  }
);

const refreshAccessToken = () => {};

export default apiController;
