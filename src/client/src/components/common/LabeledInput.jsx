import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 100%;
  height: 105px;
  margin-bottom: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  padding-bottom: 11px;

  font-weight: 400;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.body};
`;

const Input = styled.input`
  width: 100%;
  height: 50px;

  margin-bottom: 11px;
  padding: 20px;

  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.body};

  outline: none;
  border-radius: 0.25rem;
  border: ${({ theme }) => theme.border.input};

  &.error {
    border: ${({ theme }) => theme.border.alert};
  }
`;

const Message = styled.div`
  width: 100%;
  text-align: right;
  font-size: 0.75rem;
  font-weight: 400;

  &.require {
    color: ${({ theme }) => theme.color.main};
  }

  &.error {
    color: ${({ theme }) => theme.color.alert};
  }
`;

function LabeledInput({
  id,
  label,
  type,
  value,
  register,
  required,
  requireMessage,
  errorMessage,
}) {
  return (
    <Container id={id}>
      <Label>{label}</Label>
      <Input
        className={errorMessage && "error"}
        type={type}
        {...register(id, required)}
      />
      {errorMessage ? (
        <Message className="error">{errorMessage}</Message>
      ) : (
        !value && <Message className="require">{requireMessage}</Message>
      )}
    </Container>
  );
}

LabeledInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  valid: PropTypes.object,
  requireMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

LabeledInput.defaultProps = {
  value: "",
  valid: undefined,
  requireMessage: undefined,
  errorMessage: undefined,
};

export default LabeledInput;
