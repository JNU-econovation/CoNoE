import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import Form from "../components/common/Form.jsx";
import FORM_INFO from "../constant/FORM_INFO.js";
import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";

const Container = styled.div`
  width: 350px;
`;

const StyledH3 = styled.h3`
  width: 100%;
  margin-bottom: 2rem;
  text-align: left;
  font-weight: 700;
  font-size: 2rem;
  color: ${({ theme }) => theme.color.body};
`;

function SignUs() {
  return (
    <Layout isLoggedIn={false}>
      <Container>
        <StyledH3>회원가입</StyledH3>
        <Form
          onSubmit={(data) => console.log(data)}
          onError={(err) => console.error(err)}
          inputInformations={FORM_INFO.SIGN_US}
          defaultValues={FORM_DEFAULT.SIGN_US}
          buttonLabel="회원가입"
        />
      </Container>
    </Layout>
  );
}

export default SignUs;
