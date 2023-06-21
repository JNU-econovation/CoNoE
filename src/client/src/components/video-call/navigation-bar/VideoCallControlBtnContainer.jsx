import React, { useState } from "react";
import styled, { css } from "styled-components";
import MicOnIcon from "../../../assets/MicOnIcon.jsx";
import MicOffIcon from "../../../assets/MicOffIcon.jsx";
import CameraOnIcon from "../../../assets/CameraOnIcon.jsx";
import CameraOffIcon from "../../../assets/CameraOffIcon.jsx";
import FaceIdIcon from "../../../assets/FaceIdIcon.jsx";
import EndCallIcon from "../../../assets/EndCallIcon.jsx";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../common/modal/ModalPortal.jsx";
import BackdropModal from "../../common/modal/BackdropModal.jsx";
import FaceIdModal from "../FaceIdModal.jsx";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  margin: 0 1rem;
  border-radius: 9999px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #3c4043;

  ${({ isRed }) =>
    isRed &&
    css`
      background-color: #ea4335;
    `}
`;

function VideoCallControlBtnContainer({ localStreamRef }) {
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isFaceIdOpen, setIsFaceIdOpen] = useState(false);

  const handleMicBtnClick = () => {
    localStreamRef.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsMicOn((isMicOn) => !isMicOn);
  };

  const handleCameraBtnClick = () => {
    localStreamRef.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsCameraOn((isCameraOn) => !isCameraOn);
  };
  return (
    <Container>
      <Button onClick={handleMicBtnClick} isRed={!isMicOn}>
        {isMicOn ? <MicOnIcon /> : <MicOffIcon />}
      </Button>
      <Button onClick={handleCameraBtnClick} isRed={!isCameraOn}>
        {isCameraOn ? <CameraOnIcon /> : <CameraOffIcon />}
      </Button>
      <Button
        onClick={() => {
          setIsFaceIdOpen(true);
        }}
      >
        <FaceIdIcon />
      </Button>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        isRed
      >
        <EndCallIcon />
      </Button>
      <ModalPortal>
        <BackdropModal open={isFaceIdOpen} setOpen={setIsFaceIdOpen}>
          <FaceIdModal />
        </BackdropModal>
      </ModalPortal>
    </Container>
  );
}

export default VideoCallControlBtnContainer;
