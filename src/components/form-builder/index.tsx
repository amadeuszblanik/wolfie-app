import React, { useState } from "react";
import styled from "styled-components";
import { BmeBox, BmeButton, BmeModal } from "bme-ui";
import { isEmpty } from "bme-utils";
import { FormattedMessage } from "react-intl";
import { FormBuilderProps, FormValues } from "./types";
import Control from "./Control";
import formBuilderValidator from "./Validators";
import { Loader } from "../index";

// @TODO: Consider using a hook for states

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 420px;
`;

const DEV_SPACES = 2;

const Component: React.FC<FormBuilderProps> = ({ controls, onSubmit, apiError, apiStatus, onErrorClose, children }) => {
  const initialValues: FormValues = {};

  controls.forEach((formControl) => {
    initialValues[formControl.name] = {
      value: formControl.initialValue || "",
      errors: [],
      touched: false,
    };
  });

  const [values, setValues] = useState<FormValues>(initialValues);

  const isLoading = apiStatus === "pending";
  const isError = apiStatus === "error";

  const handleUpdateValue = (name: string) => (nextValue: string) => {
    setValues({
      ...values,
      [name]: {
        ...values[name],
        value: nextValue,
        errors: formBuilderValidator(
          controls.find(({ name: controlName }) => controlName === name)?.validators || [],
          nextValue,
        ),
        touched: true,
      },
    });
  };

  const getError = (name: string) => {
    const errors = values[name].errors;

    return isEmpty(errors) ? undefined : errors.join(", ");
  };

  const runAllValidators = () => {
    const nextValues = { ...values };

    Object.keys(nextValues).forEach((name) => {
      nextValues[name].errors = formBuilderValidator(
        controls.find(({ name: controlName }) => controlName === name)?.validators || [],
        nextValues[name].value,
      );
    });

    setValues(nextValues);
  };

  const checkIfUntouchedIsInvalid = () =>
    Object.entries(values)
      .filter(([_name, { touched }]) => !touched)
      .some(
        ([_name, { value }]) =>
          !isEmpty(formBuilderValidator(controls.find(({ name }) => name === _name)?.validators || [], value)),
      );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAnyError = Object.values(values).some(({ errors }) => !isEmpty(errors)) || checkIfUntouchedIsInvalid();

    if (isAnyError) {
      runAllValidators();

      return;
    }

    const valuesToSubmit = Object.entries(values).reduce((acc, [name, { value }]) => ({ ...acc, [name]: value }), {});

    onSubmit(valuesToSubmit);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {isLoading && <Loader />}
      {isError && <BmeModal onClose={onErrorClose}>{apiError}</BmeModal>}
      {controls.map((control) => (
        <BmeBox key={control.name} direction="column" width="100%" margin="no|no|sm">
          <Control
            {...control}
            error={getError(control.name)}
            value={values[control.name].value}
            onChange={handleUpdateValue(control.name)}
          />
        </BmeBox>
      ))}
      <BmeBox alignX="center" width="100%" margin="md|no|no">
        <BmeButton type="submit">
          <FormattedMessage id="common.form.submit.label" />
        </BmeButton>
      </BmeBox>
      {children && (
        <BmeBox direction="column" margin="md|no|no">
          {children}
        </BmeBox>
      )}
      <pre>
        <code>{JSON.stringify(values, null, DEV_SPACES)}</code>
      </pre>
    </StyledForm>
  );
};

export default Component;
