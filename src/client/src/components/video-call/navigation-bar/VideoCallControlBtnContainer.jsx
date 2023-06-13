import React, { useState } from "react";
import styled, { css } from "styled-components";
import MicOnIcon from "../../../assets/MicOnIcon.jsx";
import MicOffIcon from "../../../assets/MicOffIcon.jsx";
import CameraOnIcon from "../../../assets/CameraOnIcon.jsx";
import CameraOffIcon from "../../../assets/CameraOffIcon.jsx";
import FaceIdIcon from "../../../assets/FaceIdIcon.jsx";
import EndCallIcon from "../../../assets/EndCallIcon.jsx";
import { useNavigate } from "react-router-dom";

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
      <Button onClick={() => {}}>
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
    </Container>
  );
}

export default VideoCallControlBtnContainer;
