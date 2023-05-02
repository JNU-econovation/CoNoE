import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import LabeledInput from "./LabeledInput.jsx";

const StyledForm = styled.form`
  width: 350px;
`;

function Form({ onSubmit, onError, defaultValues, inputInformations }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      {inputInformations.map((info) => (
        <LabeledInput
          key={info.id}
          id={info.id}
          label={info.label}
          type={info.type}
          value={getValues(info.id)}
          register={register}
          required={info?.required}
          errorMessage={errors[info.id] && errors[info.id]?.message}
          requireMessage={info?.requireMessage}
        />
      ))}

      <button type="submit">submit</button>
    </StyledForm>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onError: PropTypes.func,
  defaultValues: PropTypes.object.isRequired,
  inputInformations: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.object,
      requireMessage: PropTypes.string,
    })
  ).isRequired,
};

export default Form;
