import React, { useState } from "react";
import BackdropModal from "../../common/modal/BackdropModal.jsx";
import SettingModal from "./SettingModal.jsx";
import SettingIcon from "../../../assets/SettingIcon.jsx";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;

function RightBtnContainer({ localStreamRef, cameraArray, micArray }) {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const handleSettingBtnClick = () => {
    setIsSettingModalOpen((isSettingModalOpen) => !isSettingModalOpen);
  };

  return (
    <Container>
      <Button onClick={handleSettingBtnClick}>
        <SettingIcon />
      </Button>

      <BackdropModal open={isSettingModalOpen} setOpen={setIsSettingModalOpen}>
        <SettingModal
          localStreamRef={localStreamRef}
          cameraArray={cameraArray}
          micArray={micArray}
        />
      </BackdropModal>
    </Container>
  );
}

export default RightBtnContainer;
