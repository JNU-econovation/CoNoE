import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import NavBar from "../components/video-call/navigation-bar/NavBar.jsx";
import getMedia from "../utils/getMedia.js";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  padding: 0 2rem;

  background-color: #202125;
`;

const UserVideoBox = styled.section`
  video {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg); /* Safari and Chrome */
    -moz-transform: rotateY(180deg); /* Firefox */
  }
`;

let myStream;

function VideoCall() {
  const { roomId } = useParams();
  const myVideoRef = useRef();
  const [cameraArray, setCameraArray] = useState([]);
  const [micArray, setMicArray] = useState([]);
  // const socket = io(`${import.meta.env.VITE_SIGNAL_SERVER}video/${roomId}`);

  const initCall = async () => {
    myStream = await getMedia({
      myStream,
      myVideoRef,
      setCameraArray,
      setMicArray,
    });
  };

  const joinRoom = async () => {
    await initCall();
  };

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <Container>
      <UserVideoBox>
        <video
          ref={myVideoRef}
          autoPlay
          playsInline
          width="400px"
          height="400px"
        />
      </UserVideoBox>

      <NavBar
        myStream={myStream}
        cameraArray={cameraArray}
        micArray={micArray}
      />
    </Container>
  );
}

export default VideoCall;
