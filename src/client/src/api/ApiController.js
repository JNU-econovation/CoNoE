import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

instance.interceptors.request.use(
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

instance.interceptors.response.use(
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
  if (err) {
    try {
      await refreshAccessToken();
      return instance.request(originalConfig);
    } catch (err) {
      console.log("error", err.response);
      window.location.href = "/";
    }
  }
  return Promise.reject(err);
};

const refreshAccessToken = async () => {
  const response = await axios.post(
    import.meta.env.VITE_BACKEND_API + "/token/refresh",
    {
      data: { refresh: localStorage.getItem("refreshToken") },
    }
  );

  localStorage.setItem("accessToken", response.refresh);
};

export default instance;
