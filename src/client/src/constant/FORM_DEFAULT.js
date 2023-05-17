const SIGN_US = {
  userId: "",
  nickname: "",
  "user-email": "",
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
  roomPassword: "",
};

Object.freeze(SIGN_US);
Object.freeze(SIGN_IN);
Object.freeze(CREATE_ROOM);
Object.freeze(ENTER_ROOM);

export default { SIGN_US, SIGN_IN, CREATE_ROOM, ENTER_ROOM };
