import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Layout from "../components/common/layout/Layout.jsx";
import FormPageContainer from "../styles/FormPageContainer.js";
import StyledH3 from "../styles/StyledH3.js";

import Form from "../components/common/form/Form.jsx";
import FORM_DEFAULT from "../constant/FORM_DEFAULT.js";
import FORM_INFO from "../constant/FORM_INFO.js";
import routes from "../routes.js";
import RoomAPI from "../api/RoomAPI.js";

const FormHeader = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AttendBtn = styled.button`
  width: 5.5rem;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1.1rem;
  text-align: right;
  color: ${({ theme }) => theme.color.main};

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

function ManageRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const onAttendBtnClick = () => {
    navigate(`${routes.attendance}/${roomId}`);
  };

  const loadDefaultValues = async () => {
    try {
      const data = await RoomAPI.getRoomSetting({ roomId });
      return {
        roomId: data.roomId,
        roomPassword: data.password,
        roomName: data.title,
      };
    } catch (e) {
      alert(e.message.data);
      return FORM_DEFAULT.MANAGE_ROOM;
    }
  };

  return (
    <Layout isLoggedIn={true} title="방 관리하기">
      <FormPageContainer>
        <FormHeader>
          <StyledH3 style={{ display: "inline", marginBottom: 0 }}>
            방 관리하기
          </StyledH3>
          <AttendBtn onClick={onAttendBtnClick}>출결 정보</AttendBtn>
        </FormHeader>
        <Form
          onSubmit={() => {
            navigate(-1);
          }}
          onError={(err) => console.log(err)}
          defaultValues={loadDefaultValues}
          inputInformations={FORM_INFO.MANAGE_ROOM}
          buttonLabel="저장하기"
        />
      </FormPageContainer>
    </Layout>
  );
}

export default ManageRoom;
