import React from "react";
import styled from "styled-components";
import Clock from "./Clock.jsx";
import VideoCallControlBtnContainer from "./VideoCallControlBtnContainer.jsx";
import SideBarBtnContainer from "./SideBarBtnContainer.jsx";

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

function NavBar({ localStreamRef, cameraArray, micArray }) {
  return (
    <NavBarContainer>
      <Clock />

      <VideoCallControlBtnContainer localStreamRef={localStreamRef} />

      <SideBarBtnContainer
        localStreamRef={localStreamRef}
        cameraArray={cameraArray}
        micArray={micArray}
      />
    </NavBarContainer>
  );
}

export default NavBar;
