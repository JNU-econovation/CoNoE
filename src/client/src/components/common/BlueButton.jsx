import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  height: 50px;
  background-color: ${({ theme }) => theme.color.main};

  border: none;
  border-radius: 0.25rem;

  color: ${({ theme }) => theme.color.white};
  font-weight: 700;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: #1659bd;
  }

  transition: background-color 0.25s ease-in-out;
`;

function BlueButton({ text, width, onClick, style, type }) {
  return (
    <Container type={type} style={{ width: width, ...style }} onClick={onClick}>
      {text}
    </Container>
  );
}

BlueButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
  type: PropTypes.string,
};

BlueButton.defaultProps = {
  text: "버튼",
  width: "200px",
  onClick: () => {},
  style: "",
  type: "",
};

export default React.memo(BlueButton);
