import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  height: 50px;
  background-color: ${({ theme }) => theme.color.main};

  border: none;
  border-radius: 0.25rem;

  color: ${({ theme }) => theme.color.white};
  font-weight: 600;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: #1659bd;
  }

  transition: background-color 0.25s ease-in-out;

  ${({ isRed }) =>
    isRed &&
    css`
      background-color: ${({ theme }) => theme.color.alert};
      &:hover {
        background-color: #d13127;
      }
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.color.addition};
  }
`;

function DefaultButton({ text, width, onClick, style, type, isRed, disabled }) {
  return (
    <Container
      isRed={isRed}
      disabled={disabled}
      type={type}
      style={{ width: width, ...style }}
      onClick={onClick}
    >
      {text}
    </Container>
  );
}

DefaultButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  isRed: PropTypes.bool,
  disabled: PropTypes.bool,
};

DefaultButton.defaultProps = {
  text: "버튼",
  width: "200px",
  onClick: () => {},
  style: {},
  type: "",
  isRed: false,
  disabled: false,
};

export default React.memo(DefaultButton);
