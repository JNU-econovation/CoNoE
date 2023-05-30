import ApiController from "./ApiController.js";

const getUserEnteredRoom = async () => {
  return await ApiController({
    url: "/api/search/joined/room",
    method: "GET",
  });
};

export default { getUserEnteredRoom };
