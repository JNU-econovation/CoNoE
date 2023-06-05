import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";

import LabeledInput from "./LabeledInput.jsx";
import DefaultButton from "../DefaultButton.jsx";

const StyledForm = styled.form`
  width: 350px;
`;

function Form({
  onSubmit,
  onError,
  defaultValues,
  inputInformations,
  buttonLabel,
}) {
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
            validation={info?.validation}
            errorMessage={errors[info.id] && errors[info.id]?.message}
            requireMessage={info?.requireMessage}
          />
        ))}

        <DefaultButton
          type="submit"
          text={buttonLabel}
          width="100%"
          style={{ marginTop: "1rem" }}
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
      validation: PropTypes.object,
      requireMessage: PropTypes.string,
    })
  ).isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default React.memo(Form);
