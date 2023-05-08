import React from "react";
import Explanation from "./Explanation.jsx";
import Form from "../common/Form.jsx";
import RegisterPhrase from "./RegisterPhrase.jsx";

import FORM_INFO from "../../constant/FORM_INFO.js";
import FORM_DEFAULT from "../../constant/FORM_DEFAULT.js";

function SignIn() {
  return (
    <>
      <Explanation />
      <Form
        onSubmit={(data) => console.log(data)}
        onError={(err) => console.log(err)}
        inputInformations={FORM_INFO.SIGN_IN}
        defaultValues={FORM_DEFAULT.SIGN_IN}
        buttonLabel="로그인"
      />
      <RegisterPhrase />
    </>
  );
}

export default React.memo(SignIn);
