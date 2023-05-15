import React from "react";

import Layout from "../components/common/layout/Layout.jsx";
import Explanation from "../components/home/Explanation.jsx";
import RegisterPhrase from "../components/home/RegisterPhrase.jsx";

import Form from "../components/common/form/Form.jsx";
import FORM_INFO from "../constant/FORM_INFO.js";
import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";

function Home() {
  return (
    <Layout isLoggedIn={false}>
      <Explanation />
      <Form
        onSubmit={(data) => console.log(data)}
        onError={(err) => console.log(err)}
        inputInformations={FORM_INFO.SIGN_IN}
        defaultValues={FORM_DEFAULT.SIGN_IN}
        buttonLabel="로그인"
      />
      <RegisterPhrase />
    </Layout>
  );
}

export default Home;
