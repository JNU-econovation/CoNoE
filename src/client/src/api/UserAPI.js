import ApiController from "./ApiController.js";

const register = async (data) => {
  let params = {
    username: data.userId,
    password: data.password,
    nickname: data.nickname,
    email: data.userEmail,
  };

  const response = ApiController({
    url: "/api/user/create",
    method: "POST",
    data: params,
  });

  localStorage.setItem("accessToken", response.tokens.access);
  localStorage.setItem("refreshToken", response.tokens.refresh);
};

const login = async (data) => {
  let params = {
    username: data.userId,
    password: data.password,
  };

  const response = ApiController({
    url: "/api/user/login",
    method: "POST",
    data: params,
  });

  localStorage.setItem("accessToken", response.token.access);
  localStorage.setItem("refreshToken", response.token.refresh);
};

const checkIsIdDuplicated = async (data) => {
  let params = {
    username: data,
  };

  const response = ApiController({
    url: "/api/user/create/username",
    method: "POST",
    data: params,
  });

  return response;
};

export default { register, login, checkIsIdDuplicated };
