import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  height: 50px;
  background-color: ${({ theme }) => theme.color.main};

  border: 1.5px solid ${({ theme }) => theme.color.main};
  border-radius: 0.25rem;

  color: ${({ theme }) => theme.color.white};
  font-weight: 700;
  font-size: 1rem;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.color.main};
    background-color: ${({ theme }) => theme.color.white};
  }

  transition: all 0.25s ease-in-out;
`;

function BlueButton({ text, width, onClick, style }) {
  return (
    <Container style={{ width: width, ...style }} onClick={onClick}>
      {text}
    </Container>
  );
}

BlueButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
};

BlueButton.defaultProps = {
  text: "버튼",
  width: "200px",
  onClick: () => {},
  style: "",
};

export default BlueButton;
