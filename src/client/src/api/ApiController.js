import axios from "axios";

const apiController = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

apiController.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = localStorage.getItem("accessToken");
    config.headers["Refresh-Token"] = localStorage.getItem("refreshToken");
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

apiController.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data.data;
  },
  async (error) => {
    await errorController(error);
  }
);

const errorController = async (err) => {
  const originalConfig = err.config;

  if (err.response && err.response.data.status === "403 FORBIDDEN") {
    try {
      await refreshAccessToken();
      return apiController.request(originalConfig);
    } catch (err) {
      console.log("error", err.response);
      window.location.href = "/";
    }
  }
  return Promise.reject(err);
};

const refreshAccessToken = async () => {
  axios.defaults.headers.common["Refresh-Token"] =
    localStorage.getItem("refreshToken");

  const response = await axios.post(
    import.meta.env.VITE_BACKEND_API + "token/refresh"
  );
  console.log(response);
};
