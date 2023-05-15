import React from "react";
import Layout from "../components/common/layout/Layout.jsx";
import StyledH3 from "../styles/StyledH3.js";
import styled from "styled-components";
import BlueButton from "../components/common/BlueButton";

const Container = styled.article`
  width: 700px;
  position: absolute;
  top: 10rem;
  margin-bottom: 10rem;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MyRoom() {
  return (
    <Layout isLoggedIn={true} title="나의 방">
      <Container>
        <TitleBar>
          <StyledH3 style={{ width: "auto", marginBottom: 0 }}>
            나의 방
          </StyledH3>
          <BlueButton
            text="입장하기"
            type="button"
            onClick={() => console.log("입장하기")}
            width="100px"
          />
        </TitleBar>
      </Container>
    </Layout>
  );
}

export default MyRoom;
