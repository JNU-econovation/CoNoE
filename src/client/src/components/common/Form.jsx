import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";

import LabeledInput from "./LabeledInput.jsx";
import BlueButton from "./BlueButton.jsx";

const StyledForm = styled.form`
  width: 350px;
`;

function Form({ onSubmit, onError, defaultValues, inputInformations }) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
        {inputInformations.map((info) => (
          <LabeledInput
            key={info.id}
            id={info.id}
            label={info.label}
            type={info.type}
            required={info?.required}
            errorMessage={errors[info.id] && errors[info.id]?.message}
            requireMessage={info?.requireMessage}
          />
        ))}

        <BlueButton
          type="submit"
          text="로그인"
          width="100%"
          style={{ marginTop: "1.5rem" }}
        />
      </StyledForm>
    </FormProvider>
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

export default React.memo(Form);
