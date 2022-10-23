import React, { useEffect, useState } from "react";
import {
  DoggoBox,
  DoggoButton,
  DoggoForm,
  DoggoGrid,
  DoggoInput,
  DoggoPasswordValidator,
  DoggoText,
} from "../../ui-components";
import { InputTypes } from "../../ui-components/input";
import { FormattedMessage, useIntl } from "react-intl";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import useChangePassword from "../../api/queries/change-password";

const Form: React.FunctionComponent = () => {
  const intl = useIntl();

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { post, status, response, error } = useChangePassword();

  const formValidator = useFormValidator([
    { name: "currentPassword", value: currentPassword, validator: [FormValidators.Required] },
    { name: "newPassword", value: newPassword, validator: [FormValidators.Required, FormValidators.Password] },
    {
      name: "newPasswordConfirm",
      value: newPasswordConfirm,
      validator: [FormValidators.Required, FormValidators.PasswordConfirm],
      additionalValues: [newPassword],
    },
  ]);

  useEffect(() => {
    if (status === ApiStatesTypes.Success) {
      setSubmitEnable(false);
      return;
    }

    setSubmitEnable(formValidator.formValid);
  }, [formValidator.formValid, status]);

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
    void post({
      currentPassword,
      newPassword,
      newPasswordConfirm,
    });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoInput
        label={intl.formatMessage({ id: "user.current_password" })}
        value={currentPassword}
        onChange={setCurrentPassword}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors["currentPassword"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "user.new_password" })}
        value={newPassword}
        onChange={setNewPassword}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors["newPassword"]}
      />
      <DoggoPasswordValidator value={newPassword} />
      <DoggoInput
        label={intl.formatMessage({ id: "user.new_confirm_password" })}
        value={newPasswordConfirm}
        onChange={setNewPasswordConfirm}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors["newPasswordConfirm"]}
      />
      <DoggoBox column>
        <DoggoGrid mobile={1} desktop={1}>
          <DoggoButton variant="blue" type="submit" disabled={!submitEnable}>
            <FormattedMessage id="page.forgot_password.set_password" />
          </DoggoButton>
        </DoggoGrid>
        {response && (
          <DoggoBox column>
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
