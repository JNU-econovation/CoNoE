import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Layout from "../components/common/layout/Layout.jsx";
import Explanation from "../components/home/Explanation.jsx";
import RegisterPhrase from "../components/home/RegisterPhrase.jsx";

import Form from "../components/common/form/Form.jsx";
import FORM_INFO from "../constant/FORM_INFO.js";
import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";
import UserAPI from "../api/UserAPI.js";
import isLoggedInState from "../recoil/atoms/isLoggedInState.js";
import routes from "../routes.js";

function Home() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();
  return (
    <Layout isLoggedIn={false}>
      <Explanation />
      <Form
        onSubmit={async (data) => {
          try {
            console.log(data);
            const response = await UserAPI.login(data);
            console.log(response);
            setIsLoggedIn(true);
            navigate(routes.home);
          } catch (error) {
            console.log(error);
          }
        }}
        inputInformations={FORM_INFO.SIGN_IN}
        defaultValues={FORM_DEFAULT.SIGN_IN}
        buttonLabel="로그인"
      />
      <RegisterPhrase />
    </Layout>
  );
}

export default Home;
