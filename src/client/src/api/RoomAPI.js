import ApiController from "./ApiController.js";

const getUserEnteredRoom = async () => {
  return await ApiController({
    url: "/api/search/joined/room",
    method: "GET",
  });
};

const createRoom = async (data) => {
  let params = {
    title: data.roomName,
    password: data.roomPassword,
  };
  const { responseData } = await ApiController({
    url: "/api/rooms/",
    method: "POST",
    data: params,
  });

  return responseData;
};

const enterRoom = async (data) => {
  await ApiController({
    url: `api/rooms/${data.roomId}/?password=${data.password}`,
  });
};

export default { getUserEnteredRoom, createRoom };
