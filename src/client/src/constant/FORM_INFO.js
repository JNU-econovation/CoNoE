import UserAPI from "../api/UserAPI.js";

const SIGN_US = [
  {
    id: "userId",
    label: "아이디",
    type: "text",
    validation: {
      required: "아이디를 입력해 주세요",
      validate: {
        checkUrl: async (value) => {
          if (value.length <= 2) {
            return;
          }
          try {
            await UserAPI.checkIsIdDuplicated(value);
          } catch (e) {
            return (
              e.response.data === "아이디가 중복되었습니다." &&
              "중복된 아이디입니다."
            );
          }
        },
      },
    },
  },
  {
    id: "nickname",
    label: "닉네임",
    type: "text",
    validation: {
      required: "닉네임을 입력해 주세요",
    },
  },
  {
    id: "userEmail",
    label: "이메일",
    type: "email",
    validation: {
      required: "이메일을 입력해 주세요",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "이메일 형식을 지켜 주세요",
      },
    },
  },
  {
    id: "password",
    label: "비밀번호",
    type: "password",
    validation: {
      required: "비밀번호를 입력해 주세요",
      minLength: { value: 8, message: "비밀번호는 8글자 이상입니다" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        message: "비밀번호는 숫자와 영어를 1글자 이상 포함합니다",
      },
    },
    requireMessage: "영어와 숫자를 포함한 8글자 이상",
  },
];

const SIGN_IN = [
  {
    id: "userId",
    label: "아이디",
    type: "text",
    validation: {
      required: "아이디를 입력해 주세요",
    },
  },
  {
    id: "password",
    label: "비밀번호",
    type: "password",
    validation: {
      required: "비밀번호를 입력해 주세요",
      minLength: { value: 8, message: "비밀번호는 8글자 이상입니다" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        message: "비밀번호는 숫자와 영어를 1글자 이상 포함합니다",
      },
    },
  },
];

const CREATE_ROOM = [
  {
    id: "roomName",
    label: "방 이름",
    type: "text",
    validation: {
      required: "방 이름을 입력해 주세요",
    },
  },
  {
    id: "roomPassword",
    label: "비밀번호",
    type: "password",
    validation: {
      required: "비밀번호를 입력해 주세요",
      minLength: { value: 8, message: "비밀번호는 8글자 이상입니다" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        message: "비밀번호는 숫자와 영어를 1글자 이상 포함합니다",
      },
    },
  },
];

const ENTER_ROOM = [
  {
    id: "roomId",
    label: "방 아이디",
    type: "text",
    validation: {
      required: "방 아이디를 입력해 주세요",
    },
  },
  {
    id: "password",
    label: "비밀번호",
    type: "password",
    validation: {
      required: "비밀번호를 입력해 주세요",
      minLength: { value: 8, message: "비밀번호는 8글자 이상입니다" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        message: "비밀번호는 숫자와 영어를 1글자 이상 포함합니다",
      },
    },
  },
];

const MANAGE_ROOM = [
  {
    id: "roomId",
    label: "방 아이디",
    type: "text",
    validation: {
      disabled: true,
      required: true,
    },
  },
  {
    id: "roomName",
    label: "방 이름",
    validation: {
      required: "방 이름을 입력해 주세요",
    },
  },
  {
    id: "roomPassword",
    label: "비밀번호",
    validation: {
      required: "비밀번호를 입력해 주세요",
      minLength: { value: 8, message: "비밀번호는 8글자 이상입니다" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        message: "비밀번호는 숫자와 영어를 1글자 이상 포함합니다",
      },
    },
  },
];

Object.freeze(SIGN_US);
Object.freeze(SIGN_IN);
Object.freeze(CREATE_ROOM);
Object.freeze(ENTER_ROOM);
Object.freeze(MANAGE_ROOM);

export default { SIGN_US, SIGN_IN, CREATE_ROOM, ENTER_ROOM, MANAGE_ROOM };
