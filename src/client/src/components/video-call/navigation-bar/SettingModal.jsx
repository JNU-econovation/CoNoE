import React, { useRef } from "react";
import styled from "styled-components";
import StyledH3 from "../../../styles/StyledH3.js";
import getMedia from "../../../utils/getMedia.js";

const Container = styled.section`
  width: 450px;
  height: 450px;
  padding: 3.5rem 3rem;
  color: ${({ theme }) => theme.color.body};
`;

function SettingModal({ localStreamRef, cameraArray, micArray }) {
  const cameraSelectRef = useRef();
  const micSelectRef = useRef();

  const handleCameraChange = async () => {
    localStreamRef.current = await getMedia({
      micId: String(micSelectRef.current.value),
      cameraId: String(cameraSelectRef.value),
      localStream: localStreamRef.current,
    });
  };

  const handleMicChange = async () => {
    localStreamRef.current = await getMedia({
      micId: String(micSelectRef.current.value),
      cameraId: String(cameraSelectRef.current.value),
      localStream: localStreamRef.current,
    });
  };

  return (
    <Container>
      <StyledH3>설정</StyledH3>
      <div>
        <label>카메라</label>
        <select onChange={handleCameraChange} ref={cameraSelectRef}>
          {cameraArray.map((camera) => (
            <option
              key={String(camera.deviceId)}
              value={String(camera.deviceId)}
            >
              {camera.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>마이크</label>
        <select onChange={handleMicChange} ref={micSelectRef}>
          {micArray.map((mic) => (
            <option key={String(mic.deviceId)} value={String(mic.deviceId)}>
              {mic.label}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
}

export default SettingModal;
