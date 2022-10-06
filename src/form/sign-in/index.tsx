import React, { useEffect, useState } from "react";
import { DoggoBox, DoggoButton, DoggoCheckbox, DoggoForm, DoggoInput, DoggoText } from "../../ui-components";
import { InputTypes } from "../../ui-components/input";
import { FormattedMessage, useIntl } from "react-intl";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import { useRouter } from "next/router";
import useSignIn from "../../api/queries/sign-in";
import { useDeviceName } from "../../hooks";

const Form: React.FunctionComponent = () => {
  const intl = useIntl();
  const router = useRouter();
  const { post, status, response, error } = useSignIn();
  const device = useDeviceName();

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignIn, setKeepSignIn] = useState(false);

  const formValidator = useFormValidator([
    { name: "username", value: username, validator: [FormValidators.Required, FormValidators.Email] },
    { name: "password", value: password, validator: [FormValidators.Required] },
    { name: "keepSignIn", value: keepSignIn, validator: [] },
  ]);

  useEffect(() => {
    setSubmitEnable(formValidator.formValid);
  }, [formValidator.formValid]);

  useEffect(() => {
    if (response && status === ApiStatesTypes.Success) {
      void router.push("/app");
    }
  }, [response, status, router]);

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
    post({
      username,
      password,
      keepSignIn,
      device,
    });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoInput
        label={intl.formatMessage({ id: "user.email" })}
        value={username}
        onChange={setUsername}
        type={InputTypes.Email}
        disabled={!formEnable}
        errors={formValidator.errors["username"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "user.password" })}
        value={password}
        onChange={setPassword}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors["password"]}
      />
      <DoggoCheckbox
        label={intl.formatMessage({ id: "user.keep_sign_in" })}
        value={keepSignIn}
        onChange={setKeepSignIn}
        errors={formValidator.errors["keepMeSignIn"]}
      />
      <DoggoBox column>
        <DoggoBox
          width={BoxWidth.Full}
          alignX={FlexAlign.Right}
          alignY={FlexAlign.Center}
          padding={{ bottom: SizesEnum.Large }}
        >
          <DoggoButton variant="blue" type="submit" disabled={!submitEnable}>
            <FormattedMessage id="common.sign_in" />
          </DoggoButton>
        </DoggoBox>
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
