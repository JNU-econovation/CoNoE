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

Object.freeze(SIGN_US);
Object.freeze(SIGN_IN);
Object.freeze(CREATE_ROOM);

export default { SIGN_US, SIGN_IN, CREATE_ROOM };
