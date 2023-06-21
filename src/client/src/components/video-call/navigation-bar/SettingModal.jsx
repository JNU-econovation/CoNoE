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

const LabeledInput = styled.div`
  padding: 0.5rem 0;

  label {
    margin-right: 1rem;
  }
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
      <LabeledInput>
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
      </LabeledInput>

      <LabeledInput>
        <label>마이크</label>
        <select onChange={handleMicChange} ref={micSelectRef}>
          {micArray.map((mic) => (
            <option key={String(mic.deviceId)} value={String(mic.deviceId)}>
              {mic.label}
            </option>
          ))}
        </select>
      </LabeledInput>
    </Container>
  );
}

export default SettingModal;
