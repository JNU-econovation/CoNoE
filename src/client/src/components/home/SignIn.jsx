import React from "react";
import Explanation from "./Explanation.jsx";
import Form from "../common/Form.jsx";
import RegisterPhrase from "./RegisterPhrase.jsx";

function SignIn() {
  const defaultValues = {
    userId: "",
    password: "",
  };

  const inputInfo = [
    {
      id: "userId",
      label: "아이디",
      type: "text",
      required: {
        required: "아이디를 입력해 주세요",
        minLength: { value: 8, message: "아이디는 8글자 이상입니다" },
      },
    },
    {
      id: "password",
      label: "비밀번호",
      type: "password",
      required: {
        required: "비밀번호를 입력해 주세요",
        minLength: { value: 8, message: "비밀번호는 8글자 이상입니다" },
      },
    },
  ];

  return (
    <>
      <Explanation />
      <Form
        onSubmit={(data) => console.log(data)}
        onError={(err) => console.log(err)}
        inputInformations={inputInfo}
        defaultValues={defaultValues}
      />
      <RegisterPhrase />
    </>
  );
}

export default React.memo(SignIn);
