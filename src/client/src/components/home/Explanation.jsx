import React from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
  padding-bottom: 2rem;
  font-family: ${({ theme }) => theme.fontFamily.logo};
  font-size: ${({ theme }) => theme.fontSize.logo};

  color: ${({ theme }) => theme.color.body};
`;

const StyledH3 = styled.h3`
  padding-bottom: 50px;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.body};

  strong {
    color: ${({ theme }) => theme.color.main};
  }
`;

function Explanation() {
  return (
    <>
      <StyledH1>Automatic Attendance</StyledH1>
      <StyledH3>
        인공지능 기반 <strong>얼굴 인식 출석체크</strong> 웹 화상 채팅 서비스
      </StyledH3>
    </>
  );
}

export default Explanation;
