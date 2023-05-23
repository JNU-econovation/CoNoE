import React, { useState } from "react";
import styled from "styled-components";
import Clock from "./Clock.jsx";

const NavBarContainer = styled.div`
  position: fixed;
  bottom: 0;

  width: calc(100% - 4rem);
  height: 6rem;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;

  color: ${({ theme }) => theme.color.white};
`;

const MainBtnContainer = styled.div``;

const SideBarBtnContainer = styled.div``;

function NavBar({ myStream }) {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const handleMicBtnClick = () => {
    myStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsMicOn((isMicOn) => !isMicOn);
    console.log(myStream.getAudioTracks());
  };

  const handleCameraBtnClick = () => {
    myStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsCameraOn((isCameraOn) => !isCameraOn);
  };

  const currentDate = new Date();

  return (
    <NavBarContainer>
      <Clock />

      <MainBtnContainer>
        <button onClick={handleMicBtnClick}>마이크</button>
        <button onClick={handleCameraBtnClick}>카메라</button>
        <button>설정</button>
      </MainBtnContainer>

      <SideBarBtnContainer>2klkd</SideBarBtnContainer>
    </NavBarContainer>
  );
}

export default NavBar;
