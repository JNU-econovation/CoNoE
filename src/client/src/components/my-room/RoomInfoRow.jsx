import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  padding: 1rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RoomName = styled.h4`
  color: ${({ theme }) => theme.color.black};
  font-weight: 600;
  font-size: 1.25rem;
`;

const Manager = styled.p`
  margin: 0 0.4rem;
  color: ${({ theme }) => theme.color.addition};
  font-weight: 600;
`;

const Button = styled.button`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.color.main};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border: none;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

function RoomInfoRow({ id, name, manager }) {
  return (
    <Container>
      <InfoBox>
        <RoomName>{name}</RoomName>
        <Manager>{manager}</Manager>
      </InfoBox>

      <Button>참여하기</Button>
    </Container>
  );
}

RoomInfoRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  manager: PropTypes.string.isRequired,
};

export default RoomInfoRow;
