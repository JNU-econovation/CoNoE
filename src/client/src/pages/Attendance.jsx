import React, { useEffect, useState } from "react";
import Layout from "../components/common/layout/Layout.jsx";
import StyledH3 from "../styles/StyledH3.js";
import styled from "styled-components";
import AttendAPI from "../api/AttendAPI.js";
import { useParams } from "react-router-dom";

const Container = styled.section`
  padding: 5rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Table = styled.table`
  width: 100%;
  overflow: auto;
  border: ${({ theme }) => theme.border.table};
  border-collapse: collapse;
`;

const THead = styled.thead`
  background-color: ${({ theme }) => theme.color.main};
`;

const THeading = styled.th`
  min-width: 7rem;
  padding: 0.5rem 1rem;
  border: ${({ theme }) => theme.border.table};
  font-weight: 500;
  font-size: 1rem;

  &.head {
    color: white;
    border-right: 2px solid white;

    &:last-child {
      border-right: ${({ theme }) => theme.border.table};
    }
  }
`;

const TBody = styled.tbody``;

const TRow = styled.tr`
  border: ${({ theme }) => theme.border.table};
`;

const TData = styled.td`
  padding: 0.5rem;
  border: ${({ theme }) => theme.border.table};
  text-align: center;
`;

function Attendance() {
  const { roomId } = useParams();
  const [attendData, setAttendData] = useState([]);
  const [userData, setUserData] = useState([]);

  const getAttendData = async () => {
    const response = await AttendAPI.getRoomAttendInfo(roomId);
    setAttendData(response);
    setUserData(response[0].attend.map((attend) => attend.name));
  };

  const replaceDate = (date) => {
    const stringArray = date.split("-");
    return `${stringArray[2]}년 ${stringArray[1]}월 ${stringArray[0]}일`;
  };

  useEffect(() => {
    getAttendData();
  }, [roomId]);
  return (
    <Layout isLoggedIn title="출결 정보" flexStart>
      <Container>
        <StyledH3>출결 정보</StyledH3>
        <Table>
          <THead>
            <TRow>
              <THeading key="empty" className="head" />
              {userData.map((userName) => (
                <THeading key={userName} className="head">
                  {userName}
                </THeading>
              ))}
            </TRow>
          </THead>
          <TBody>
            {attendData.map((data) => (
              <TRow key={data.date}>
                <THeading key={data.date}>{replaceDate(data.date)}</THeading>
                {data.attend.map((userData) => (
                  <TData key={userData.name}>
                    {userData.isCheck ? "O" : "X"}
                  </TData>
                ))}
              </TRow>
            ))}
          </TBody>
        </Table>
      </Container>
    </Layout>
  );
}

export default Attendance;
