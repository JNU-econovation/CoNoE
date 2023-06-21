import ApiController from "./ApiController.js";
import axios from "axios";

const register = async (data) => {
  let params = {
    username: data.userId,
    password: data.password,
    nickname: data.nickname,
    email: data.userEmail,
  };

  const response = await ApiController({
    url: "/api/user/create",
    method: "POST",
    data: params,
  });

  console.log(response);

  localStorage.setItem("username", response.data.username);
  localStorage.setItem("accessToken", response.data.token.access);
  localStorage.setItem("refreshToken", response.data.token.refresh);
};

const login = async (data) => {
  let params = {
    username: data.userId,
    password: data.password,
  };

  const response = await axios({
    url: import.meta.env.VITE_BACKEND_API + "/api/user/login",
    method: "POST",
    data: params,
  });

  localStorage.setItem("username", response.data.user.username);
  localStorage.setItem("accessToken", response.data.token.access);
  localStorage.setItem("refreshToken", response.data.token.refresh);
};

const checkIsIdDuplicated = async (data) => {
  let params = {
    username: data,
  };

  await ApiController({
    url: "/api/user/create/username",
    method: "POST",
    data: params,
  });
};

const getUserSettings = async (userId) => {
  const response = await ApiController({
    url: `/api/user/${userId}`,
    method: "GET",
  });

  return response.data;
};

export default { register, login, checkIsIdDuplicated, getUserSettings };
