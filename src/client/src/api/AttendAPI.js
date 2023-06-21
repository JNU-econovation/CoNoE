import ApiController from "./ApiController.js";

const postAttend = async (roomId) => {
  return await ApiController({
    url: `/api/check/room?roomId=${roomId}`,
    method: "POST",
  });
};

const getRoomAttendInfo = async (roomId) => {
  const response = await ApiController({
    url: `/api/check/room?roomId=${roomId}`,
    method: "GET",
  });
  return response.data;
};

export default { postAttend, getRoomAttendInfo };
