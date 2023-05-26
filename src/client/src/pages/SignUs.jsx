import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Layout from "../components/common/layout/Layout.jsx";
import Form from "../components/common/form/Form.jsx";

import StyledH3 from "../styles/StyledH3.js";
import FORM_INFO from "../constant/FORM_INFO.js";
import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";
import FormPageContainer from "../styles/FormPageContainer.js";
import UserAPI from "../api/UserAPI.js";
import routes from "../routes.js";
import isLoggedInState from "../recoil/atoms/isLoggedInState.js";

function SignUs() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  return (
    <Layout isLoggedIn={false}>
      <FormPageContainer>
        <StyledH3>회원가입</StyledH3>
        <Form
          onSubmit={async (data) => {
            console.log(data);
            try {
              await UserAPI.register(data);
              setIsLoggedIn(true);
              navigate(routes.home);
            } catch (e) {
              console.log(e);
            }
          }}
          onError={(err) => console.error(err)}
          inputInformations={FORM_INFO.SIGN_US}
          defaultValues={FORM_DEFAULT.SIGN_US}
          buttonLabel="회원가입"
        />
      </FormPageContainer>
    </Layout>
  );
}

export default SignUs;
