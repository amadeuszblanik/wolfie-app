import React, { useEffect, useState } from "react";
import { WeightUnits } from "../../api/types/weight-units.types";
import {
  DoggoBox,
  DoggoButton,
  DoggoCheckbox,
  DoggoForm,
  DoggoInput,
  DoggoPasswordValidator,
  DoggoSelect,
  DoggoText,
} from "../../ui-components";
import { InputTypes } from "../../ui-components/input";
import { FormattedMessage, useIntl } from "react-intl";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import useResetPasswordStep0 from "../../api/queries/reset-password-step-0";

const Form: React.FunctionComponent = () => {
  const intl = useIntl();

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const { get, status, response, error } = useResetPasswordStep0(userEmail);

  const formValidator = useFormValidator([
    { name: "userEmail", value: userEmail, validator: [FormValidators.Required, FormValidators.Email] },
  ]);

  useEffect(() => {
    setSubmitEnable(formValidator.formValid);
  }, [formValidator.formValid]);

  useEffect(() => {
    switch (status) {
      case ApiStatesTypes.Loading:
        setFormEnable(false);
        break;
      case ApiStatesTypes.Success:
        setFormEnable(false);
        break;
      default:
        setFormEnable(true);
    }
  }, [status]);

  const handleSubmit = () => {
    void get();
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoInput
        label={intl.formatMessage({ id: "user.email" })}
        value={userEmail}
        onChange={setUserEmail}
        type={InputTypes.Email}
        disabled={!formEnable}
        errors={formValidator.errors["userEmail"]}
      />
      <DoggoBox column>
        <DoggoBox
          width={BoxWidth.Full}
          alignX={FlexAlign.Right}
          alignY={FlexAlign.Center}
          padding={{ bottom: SizesEnum.Large }}
        >
          <DoggoButton variant="blue" type="submit" disabled={!submitEnable}>
            <FormattedMessage id="page.forgot_password.send_email" />
          </DoggoButton>
        </DoggoBox>
        {response && (
          <DoggoBox>
            <DoggoText color="green">{response.message}</DoggoText>
          </DoggoBox>
        )}
        {error && (
          <DoggoBox>
            <DoggoText color="red">{error.message}</DoggoText>
          </DoggoBox>
        )}
      </DoggoBox>
    </DoggoForm>
  );
};

export default Form;
