import React from "react";

import Layout from "../components/common/layout/Layout.jsx";
import Form from "../components/common/form/Form.jsx";

import StyledH3 from "../styles/StyledH3.js";
import FORM_INFO from "../constant/FORM_INFO.js";
import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";
import FormPageContainer from "../styles/FormPageContainer.js";

function SignUs() {
  return (
    <Layout isLoggedIn={false}>
      <FormPageContainer>
        <StyledH3>회원가입</StyledH3>
        <Form
          onSubmit={(data) => console.log(data)}
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
