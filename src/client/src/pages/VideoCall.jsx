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
let myPeerConnection;
let myDataChannel;

function VideoCall() {
  const socket = io(import.meta.env.VITE_SIGNAL_SERVER);

  const { roomId } = useParams();
  const myVideoRef = useRef();
  const otherVideoRef = useRef();
  const [cameraArray, setCameraArray] = useState([]);
  const [micArray, setMicArray] = useState([]);

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
    await makeConnection();
    socket.emit("join_room", roomId);
  };

  useEffect(() => {
    joinRoom();

    return () => {
      // socket.disconnect();
    };
  }, []);

  // RTC code
  const makeConnection = async () => {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);
    await myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));
    myPeerConnection.addEventListener("track", handleTrack);
  };

  const handleIce = (data) => {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, roomId);
  };

  const handleTrack = (data) => {
    console.log("got an stream from my peer");
    console.log("Peer's ", data.streams[0]);
    console.log("My ", myStream);
    console.log(data.streams);
    otherVideoRef.current.srcObject = data.streams[0];
  };

  // socket
  socket.on("welcome", async () => {
    myDataChannel = myPeerConnection.createDataChannel("chat");
    myDataChannel.addEventListener("message", (e) => console.log(e.data));
    console.log("made data channel");

    const offer = await myPeerConnection.createOffer();
    await myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer", offer, roomId);
  });

  socket.on("offer", async (offer) => {
    myPeerConnection.addEventListener("datachannel", (e) => {
      myDataChannel = e.channel;
      myDataChannel.addEventListener("message", (e) => console.log(e.data));
    });
    console.log("receive the offer");

    await myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    await myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomId);
    console.log("sent the answer");
  });

  socket.on("answer", async (answer) => {
    console.log("receive the answer");
    await myPeerConnection.setRemoteDescription(answer);
  });

  socket.on("ice", async (ice) => {
    console.log("received candidate");
    await myPeerConnection.addIceCandidate(ice);
  });

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
        myStream={myStream}
        cameraArray={cameraArray}
        micArray={micArray}
      />
    </Container>
  );
}

export default VideoCall;
