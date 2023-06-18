import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import StyledH3 from "../../styles/StyledH3.js";
import getMedia from "../../utils/getMedia.js";
import modelJSON from "../../model.json";

const Container = styled.section`
  padding: 3rem;
  color: ${({ theme }) => theme.color.body};
`;

const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const FaceVideo = styled.video`
  transform: rotateY(180deg);
`;

const AttendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function FaceIdModal() {
  const localStreamRef = useRef();
  const faceRef = useRef();
  const [isUserFace, setIsUserFace] = useState(false);

  const getFaceVideo = async () => {
    localStreamRef.current = await getMedia({
      localStream: localStreamRef.current,
      myVideoRef: faceRef,
      micOff: true,
    });
    await identifyUserByModel();
  };

  const identifyUserByModel = async () => {
    const model = await tf.loadLayersModel(
      import.meta.env.VITE_MODEL_URL + "/model"
    );

    // const model = await tf.loadLayersModel("../../model.json");
    console.log(model);
    // const webcamForModel = await tf.data.webcam(faceRef.current, {
    //   resizeHeight: 160,
    //   resizeWidth: 160,
    // });
  };

  useEffect(() => {
    getFaceVideo();
  }, []);

  return (
    <Container>
      <StyledH3>출석하기</StyledH3>
      <Article>
        <FaceVideo ref={faceRef} autoPlay playsInline width="300px" />
        <AttendContainer>
          <div>사용자가 카메라에 인식되지 않습니다</div>
          <button>출석 불가</button>
        </AttendContainer>
      </Article>
    </Container>
  );
}

export default FaceIdModal;
