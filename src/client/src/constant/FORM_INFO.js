const SIGN_US = [
  {
    id: "userId",
    label: "아이디",
    type: "text",
    required: {
      required: "아이디를 입력해 주세요",
      validate: (value) => {
        return value !== "false" || "false";
      },
    },
  },
  {
    id: "nickname",
    label: "닉네임",
    type: "text",
    required: {
      required: "닉네임을 입력해 주세요",
    },
  },
  {
    id: "user-email",
    label: "이메일",
    type: "email",
    required: {
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
    required: {
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

Object.freeze(SIGN_US);
export default { SIGN_US };
