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
    url: "/api/rooms",
    method: "POST",
    data: params,
  });

  return responseData;
};

const enterRoom = async (data) => {
  await ApiController({
    url: `api/rooms/${data.roomId}?password=${data.password}`,
    method: "GET",
  });
};

const getRoomSetting = async ({ roomId }) => {
  const { data } = await ApiController({
    url: `api/search/room/${roomId}`,
    method: "GET",
  });
  return data[0];
};

export default { getUserEnteredRoom, createRoom, enterRoom, getRoomSetting };
