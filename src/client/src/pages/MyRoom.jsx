import React from "react";
import Layout from "../components/common/layout/Layout.jsx";
import StyledH3 from "../styles/StyledH3.js";
import styled from "styled-components";
import BlueButton from "../components/common/BlueButton";
import RoomInfoRow from "../components/my-room/RoomInfoRow.jsx";

const Container = styled.article`
  width: 700px;
  position: absolute;
  top: 10rem;
  margin-bottom: 10rem;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MyRoom() {
  const roomInfoArray = [
    {
      roomId: "1",
      roomName: "캡스톤 모임",
      userName: "경주원",
      isAdmin: true,
    },
    {
      roomId: "2",
      roomName: "인공지능",
      userName: "이도연",
      isAdmin: false,
    },
    {
      roomId: "3",
      roomName: "스프링",
      userName: "이승건",
      isAdmin: false,
    },
  ];

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

        {roomInfoArray.map((info) => (
          <RoomInfoRow
            key={info.roomId}
            id={info.roomId}
            name={info.roomName}
            manager={info.isAdmin ? "본인" : info.userName}
          />
        ))}
      </Container>
    </Layout>
  );
}

export default MyRoom;
