import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";
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
import { FlexAlign } from "../../ui-components/box";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import useResetPasswordStep1 from "../../api/queries/reset-password-step-1";

interface Props {
  token: string;
}

const Form: React.FunctionComponent<Props> = ({ token }) => {
  const intl = useIntl();

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { post, status, response, error } = useResetPasswordStep1();

  const formValidator = useFormValidator([
    { name: "password", value: password, validator: [FormValidators.Required, FormValidators.Password] },
    {
      name: "passwordConfirm",
      value: passwordConfirm,
      validator: [FormValidators.Required, FormValidators.PasswordConfirm],
      additionalValues: [password],
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
      token,
      password,
      passwordConfirm,
    });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoInput
        label={intl.formatMessage({ id: "user.password" })}
        value={password}
        onChange={setPassword}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors.password}
      />
      <DoggoPasswordValidator value={password} />
      <DoggoInput
        label={intl.formatMessage({ id: "user.confirm_password" })}
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors.passwordConfirm}
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
            <DoggoBox alignX={FlexAlign.Right} padding={{ top: SizesEnum.Medium }}>
              <Link href="/auth/sign-in">
                <a>
                  <DoggoButton variant="blue">
                    <FormattedMessage id="common.sign_in" />
                  </DoggoButton>
                </a>
              </Link>
            </DoggoBox>
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
