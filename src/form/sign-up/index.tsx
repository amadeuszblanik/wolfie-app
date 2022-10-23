import React, { useEffect, useState } from "react";
import { WeightUnits } from "../../api/types/weight-units.types";
import {
  DoggoBox,
  DoggoButton,
  DoggoCheckbox,
  DoggoForm,
  DoggoGrid,
  DoggoInput,
  DoggoPasswordValidator,
  DoggoSelect,
  DoggoText,
} from "../../ui-components";
import { InputTypes } from "../../ui-components/input";
import { FormattedMessage, useIntl } from "react-intl";
import { enumToList } from "../../utils";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import useSignUp from "../../api/queries/sign-up";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import Link from "next/link";
import { ButtonSizes } from "../../ui-components/button";

const Form: React.FunctionComponent = () => {
  const intl = useIntl();
  const { post, status, response, error } = useSignUp();

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [weightUnit, setWeightUnit] = useState<string | undefined>(WeightUnits.Pound);
  const [gdprConsent, setGdprConsent] = useState(false);

  const formValidator = useFormValidator([
    { name: "email", value: email, validator: [FormValidators.Required, FormValidators.Email] },
    { name: "firstName", value: firstName, validator: [FormValidators.Required, FormValidators.Name] },
    { name: "lastName", value: lastName, validator: [FormValidators.Required, FormValidators.Name] },
    { name: "password", value: password, validator: [FormValidators.Required, FormValidators.Password] },
    {
      name: "passwordConfirm",
      value: passwordConfirm,
      validator: [FormValidators.Required, FormValidators.PasswordConfirm],
      additionalValues: [password],
    },
    { name: "weightUnit", value: String(weightUnit), validator: [FormValidators.Required] },
    { name: "gdprConsent", value: gdprConsent, validator: [FormValidators.Required] },
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
    post({
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
      weightUnit: weightUnit as WeightUnits,
      gdprConsent,
    });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoInput
        label={intl.formatMessage({ id: "user.email" })}
        value={email}
        onChange={setEmail}
        type={InputTypes.Email}
        disabled={!formEnable}
        errors={formValidator.errors["email"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "user.first_name" })}
        value={firstName}
        onChange={setFirstName}
        type={InputTypes.Text}
        disabled={!formEnable}
        errors={formValidator.errors["firstName"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "user.last_name" })}
        value={lastName}
        onChange={setLastName}
        type={InputTypes.Text}
        disabled={!formEnable}
        errors={formValidator.errors["lastName"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "user.password" })}
        value={password}
        onChange={setPassword}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors["password"]}
      />
      <DoggoPasswordValidator value={password} />
      <DoggoInput
        label={intl.formatMessage({ id: "user.confirm_password" })}
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        type={InputTypes.Password}
        disabled={!formEnable}
        errors={formValidator.errors["passwordConfirm"]}
      />
      <DoggoSelect
        label={intl.formatMessage({ id: "user.weight_unit" })}
        value={weightUnit}
        onChange={(nextValue) => setWeightUnit(nextValue)}
        list={enumToList(WeightUnits, true)}
        disabled={!formEnable}
        errors={formValidator.errors["weightUnit"]}
      />
      <DoggoCheckbox
        label={intl.formatMessage({ id: "user.gdpr" })}
        value={gdprConsent}
        onChange={setGdprConsent}
        disabled={!formEnable}
        errors={formValidator.errors["gdprConsent"]}
      />
      <DoggoBox>
        <DoggoGrid mobile={1} desktop={2}>
          <Link href="/auth/sign-in">
            <a>
              <DoggoButton size={ButtonSizes.FullWidth}>
                <FormattedMessage id="common.sign_in" />
              </DoggoButton>
            </a>
          </Link>
          <DoggoButton variant="blue" type="submit" disabled={!submitEnable} size={ButtonSizes.FullWidth}>
            <FormattedMessage id="common.sign_up" />
          </DoggoButton>
        </DoggoGrid>
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
