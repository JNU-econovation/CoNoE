import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

import StyledH3 from "../../styles/StyledH3.js";
import getMedia from "../../utils/getMedia.js";

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
  //transform: rotateY(180deg);
`;

const AttendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function FaceIdModal() {
  const localStreamRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const faceMatcherRef = useRef();

  const [isUserFace, setIsUserFace] = useState(false);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  const videoSize = { width: 300, height: 225 };

  const getFaceVideo = async () => {
    localStreamRef.current = await getMedia({
      localStream: localStreamRef.current,
      myVideoRef: videoRef,
      micOff: true,
    });
  };

  const loadFaceApi = async () => {
    const MODEL_URL = "/models";
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    ]).then(() => {
      console.log("model loaded successfully");
      setIsModelsLoaded(true);
    });
  };

  // const identifyUserByModel = async () => {
  // const model = await tf.loadLayersModel("/bin_file/model.json");
  // const model = await tf.loadLayersModel("../../model.json");
  // console.log(model);
  // const webcamForModel = await tf.data.webcam(faceRef.current, {
  //   resizeHeight: 160,
  //   resizeWidth: 160,
  // });
  // };

  const handleVideoOnPlay = () => {
    const displaySize = {
      width: videoSize.width,
      height: videoSize.height,
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);

    setInterval(async () => {
      if (!canvasRef || !canvasRef.current || !isModelsLoaded) return;
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (!detections) {
        return;
      }

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const results = resizedDetections.map((d) => {
        return faceMatcherRef.current.findBestMatch(d.descriptor);
      });

      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoSize.width, videoSize.height);

      results.forEach((result, i) => {
        if (result._distance < 0.7) return;

        if (result._label === "son") {
          setIsUserFace(true);
          console.log(result);
        }

        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result._label.toString(),
        });
        drawBox.draw(canvasRef.current);
      });
    }, 500);
  };

  const loadLabeledImage = () => {
    if (!isModelsLoaded) {
      return;
    }

    const labels = ["son"];

    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(
            `../labeled_images/${label}/${i}.png`
          );
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        const labeledDescriptors = new faceapi.LabeledFaceDescriptors(
          label,
          descriptions
        );
        faceMatcherRef.current = new faceapi.FaceMatcher(
          labeledDescriptors,
          0.7
        );
      })
    );
  };

  useEffect(() => {
    loadFaceApi();
    getFaceVideo();
  }, []);

  useEffect(() => {
    loadLabeledImage();
  }, [isModelsLoaded]);

  return (
    <Container>
      <StyledH3>출석하기</StyledH3>
      <Article>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FaceVideo
            ref={videoRef}
            onPlay={handleVideoOnPlay}
            autoPlay
            playsInline
            width={videoSize.width}
            height={videoSize.height}
          />
          <canvas ref={canvasRef} style={{ position: "absolute" }} />
        </div>
        <AttendContainer>
          <div>
            {isUserFace
              ? "사용자가 카메라에 인식되었습니다"
              : "사용자가 카메라에 인식되지 않습니다"}
          </div>
          <button>출석 불가</button>
        </AttendContainer>
      </Article>
    </Container>
  );
}

export default React.memo(FaceIdModal);
