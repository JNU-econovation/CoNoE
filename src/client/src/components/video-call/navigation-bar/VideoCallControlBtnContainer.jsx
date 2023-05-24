import React, { useState } from "react";

function VideoCallControlBtnContainer({ localStreamRef }) {
  const [isMicOn, setIsMicOn] = useState(false);
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
    <div>
      <button onClick={handleMicBtnClick}>마이크</button>
      <button onClick={handleCameraBtnClick}>카메라</button>
      <button>통화 종료</button>
    </div>
  );
}

export default VideoCallControlBtnContainer;
