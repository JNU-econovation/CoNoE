import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import routes from "../../routes.js";
import BlueButton from "../common/BlueButton.jsx";
import Explanation from "./Explanation.jsx";

const CircleBox = styled.article`
  height: 200px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 60px;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 9999px;
  background: radial-gradient(
    308.35% 966.56% at -26.83% -36%,
    #c7d5e0 0.3%,
    #ffffff 78.57%
  );

  .text {
    text-align: center;
    color: ${({ theme }) => theme.color.body};
    font-weight: 600;
    line-height: 150%;
    strong {
      color: ${({ theme }) => theme.color.main};
      font-weight: 700;
    }
  }
`;

function Main() {
  const navigate = useNavigate();
  return (
    <>
      <Explanation />
      <BlueButton
        text="내가 참여한 방"
        onClick={() => {
          navigate(routes.myRoom);
        }}
      />

      <CircleBox>
        <Circle>
          <div className="text">
            학교나 회사 등<br />
            <strong>출석체크</strong>와 <strong>화상채팅</strong>이<br />
            필요한 곳 어디든
          </div>
        </Circle>

        <Circle>
          <div className="text">
            <strong>Face Detection</strong>과<br />
            <strong>Face Recognition</strong>을<br />
            한번에
          </div>
        </Circle>

        <Circle>
          <div className="text">
            접근성이 높은
            <br />
            <strong>웹</strong> 어플리케이션
          </div>
        </Circle>
      </CircleBox>
    </>
  );
}

export default Main;
