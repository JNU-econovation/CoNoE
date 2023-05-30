import React from "react";
import styled from "styled-components";
import StyledH3 from "../../styles/StyledH3.js";
import Form from "../common/form/Form.jsx";
import FORM_INFO from "../../constant/FORM_INFO.js";
import FORM_DEFAULT from "../../constant/FORM_DEFAULT.js";
import PropTypes from "prop-types";
import RoomAPI from "../../api/RoomAPI.js";

const Container = styled.article`
  width: 450px;
  height: 450px;
  padding: 3.5rem 3rem;
`;

function EnterRoomModal({ setOpen }) {
  return (
    <Container>
      <StyledH3>입장하기</StyledH3>
      <Form
        onSubmit={async (data) => {
          console.log(data);
          try {
            await RoomAPI.enterRoom(data);
            setOpen(false);
          } catch (e) {
            alert("존재하지 않는 방입니다.");
          }
        }}
        onError={(err) => console.error(err)}
        inputInformations={FORM_INFO.ENTER_ROOM}
        defaultValues={FORM_DEFAULT.ENTER_ROOM}
        buttonLabel="입장하기"
      />
    </Container>
  );
}

EnterRoomModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default EnterRoomModal;
