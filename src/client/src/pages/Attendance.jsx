import React, { useEffect, useState } from "react";
import Layout from "../components/common/layout/Layout.jsx";
import StyledH3 from "../styles/StyledH3.js";
import styled from "styled-components";

const SAMPLE = [
  {
    date: "27-05-23",
    attend: [
      {
        name: "econo",
        isCheck: false,
      },
      {
        name: "yardyard",
        isCheck: true,
      },
      {
        name: "joowon",
        isCheck: false,
      },
    ],
  },
  {
    date: "27-05-24",
    attend: [
      {
        name: "econo",
        isCheck: true,
      },
      {
        name: "yardyard",
        isCheck: false,
      },
      {
        name: "joowon",
        isCheck: false,
      },
    ],
  },
];

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
  background-color: lightgray;
`;

const THeading = styled.th`
  min-width: 7rem;
  padding: 0.5rem 1rem;
  border: ${({ theme }) => theme.border.table};
  font-weight: 600;
  font-size: 1.1rem;
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
  const [attendData, setAttendData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setAttendData(SAMPLE);
    setUserData(SAMPLE[0].attend.map((attend) => attend.name));
  }, [SAMPLE]);
  return (
    <Layout isLoggedIn title="출결 정보" flexStart>
      <Container>
        <StyledH3>출결 정보</StyledH3>
        <Table>
          <THead>
            <TRow>
              <THeading key="empty" />
              {userData.map((userName) => (
                <THeading key={userName}>{userName}</THeading>
              ))}
            </TRow>
          </THead>
          <TBody>
            {attendData.map((data) => (
              <TRow key={data.date}>
                <THeading key={data.date}>{data.date}</THeading>
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
