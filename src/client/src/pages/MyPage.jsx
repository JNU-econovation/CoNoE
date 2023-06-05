import React from "react";
import Layout from "../components/common/layout/Layout.jsx";
import FormPageContainer from "../styles/FormPageContainer.js";
import StyledH3 from "../styles/StyledH3.js";
import Form from "../components/common/form/Form.jsx";

import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";
import FORM_INFO from "../constant/FORM_INFO.js";
import DefaultButton from "../components/common/DefaultButton.jsx";
import { useSetRecoilState } from "recoil";
import isLoggedInState from "../recoil/atoms/isLoggedInState.js";
import { useNavigate } from "react-router-dom";
import routes from "../routes.js";

function MyPage() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const onLogOutBtnClick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsLoggedIn(false);
    navigate(routes.home);
  };
  return (
    <Layout isLoggedIn={true} title="내 설정">
      <FormPageContainer>
        <StyledH3>내 설정</StyledH3>
        <Form
          onSubmit={(data) => console.log(data)}
          onError={(err) => console.error(err)}
          defaultValues={FORM_DEFAULT.ACCOUNT_SETTINGS}
          inputInformations={FORM_INFO.ACCOUNT_SETTINGS}
          buttonLabel="수정하기"
        />
        <DefaultButton
          text="로그아웃"
          type="button"
          onClick={onLogOutBtnClick}
          width="100%"
          style={{ marginTop: "1rem" }}
          isRed={true}
        />
      </FormPageContainer>
    </Layout>
  );
}

export default MyPage;
