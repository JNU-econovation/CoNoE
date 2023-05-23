import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavBar from "../components/video-call/navigation-bar/NavBar.jsx";
import { io } from "socket.io-client";

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
  // const socket = io(`${import.meta.env.VITE_BACKEND_API}video/${roomId}`);

  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      myVideoRef.current.srcObject = myStream;
      await getCameras();
    } catch (err) {
      console.error(err);
    }
  };

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setCameraArray(devices.filter((device) => device.kind === "videoinput"));
    } catch (err) {
      console.error(err);
    }
  };

  const initCall = async () => {
    await getMedia();
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

      <NavBar myStream={myStream} />
    </Container>
  );
}

export default VideoCall;
