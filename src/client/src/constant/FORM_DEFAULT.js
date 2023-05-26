const SIGN_US = {
  userId: "",
  nickname: "",
  userEmail: "",
  password: "",
};

const SIGN_IN = {
  userId: "",
  password: "",
};

const CREATE_ROOM = {
  roomName: "",
  roomPassword: "",
};

const ENTER_ROOM = {
  roomId: "",
  password: "",
};

const MANAGE_ROOM = {
  roomId: "1",
  roomName: "캡스톤 모임",
  roomPassword: "aaaa1234",
};

Object.freeze(SIGN_US);
Object.freeze(SIGN_IN);
Object.freeze(CREATE_ROOM);
Object.freeze(ENTER_ROOM);
Object.freeze(MANAGE_ROOM);

export default { SIGN_US, SIGN_IN, CREATE_ROOM, ENTER_ROOM, MANAGE_ROOM };
