import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import NavBar from "../components/video-call/navigation-bar/NavBar.jsx";
import getMedia from "../utils/getMedia.js";
import { WebRTC } from "../utils/WebRTC.js";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  padding: 0 2rem;

  background-color: #202125;
`;

const UserVideoBox = styled.section`
  video {
    transform: rotateY(180deg);
  }
`;

function VideoCall() {
  const { roomId } = useParams();
  const socket = io(import.meta.env.VITE_SIGNAL_SERVER);
  const webRtc = new WebRTC(socket, roomId);

  const localStreamRef = useRef();
  const myVideoRef = useRef();
  const otherVideoRef = useRef();

  const [cameraArray, setCameraArray] = useState([]);
  const [micArray, setMicArray] = useState([]);

  const initCall = async () => {
    localStreamRef.current = await getMedia({
      localStreamRef,
      myVideoRef,
      setCameraArray,
      setMicArray,
    });
  };

  const makeConnection = async () => {
    webRtc.setIceCandidate();
    await webRtc.addTracks(localStreamRef.current);
    webRtc.setRemoteVideo(otherVideoRef);
  };

  const joinRoom = async () => {
    await initCall();
    await makeConnection();
    socket.emit("join_room", roomId);
  };

  useEffect(() => {
    joinRoom();

    socket.on("welcome", webRtc.setLocalOffer);
    socket.on("offer", webRtc.getRemoteOffer);
    socket.on("answer", webRtc.getRemoteAnswer);
    socket.on("ice", webRtc.getRemoteIce);

    return () => {
      // socket.disconnect();
      socket.off("welcome", webRtc.setLocalOffer);
      socket.off("offer", webRtc.getRemoteOffer);
      socket.off("answer", webRtc.getRemoteAnswer);
      socket.off("ice", webRtc.getRemoteIce);
    };
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

      <UserVideoBox>
        <video
          ref={otherVideoRef}
          autoPlay
          playsInline
          width="400px"
          height="400px"
        />
      </UserVideoBox>

      <NavBar
        localStreamRef={localStreamRef}
        cameraArray={cameraArray}
        micArray={micArray}
      />
    </Container>
  );
}

export default VideoCall;
