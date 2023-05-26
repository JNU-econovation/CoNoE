import ApiController from "./ApiController.js";

const getUserEnteredRoom = async () => {
  ApiController({
    url: "/search/joined/room/",
    method: "GET",
  });
};

export default { getUserEnteredRoom };
