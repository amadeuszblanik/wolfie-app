import { BmeBox, BmeButton, BmeCheckbox, BmeInput, BmeSelect, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useLayoutEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { SelectItem } from "bme-ui/dist/cjs/types/atoms/select/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import { Link } from "../../atoms";
import { WeightUnits } from "../../types/weight-units.type";
import { selectSignUpError, selectSignUpMessage, selectSignUpStatus, signUpActions } from "../../store/sign-up.slice";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeSignUpStatus = useAppSelector(selectSignUpStatus);
  const storeSignUpMessage = useAppSelector(selectSignUpMessage);
  const storeSignUpError = useAppSelector(selectSignUpError);

  const weightUnitsList: SelectItem[] = Object.values(WeightUnits).map((weightUnit) => ({
    key: weightUnit,
    label: intl.formatMessage({ id: `common.form.weight_unit.value.${weightUnit.toLowerCase()}` }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [weightUnit, setWeightUnit] = useState<SelectItem | null>(
    weightUnitsList.find((item) => item.key === WeightUnits.Kilogram) || null,
  );
  const [gdprConsent, setGdprConsent] = useState(false);

  useLayoutEffect(() => {
    if (storeSignUpError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (storeSignUpMessage) {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [storeSignUpError, storeSignUpMessage]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      signUpActions.signUp({
        email,
        firstName,
        lastName,
        password,
        passwordConfirm,
        weightUnit: weightUnit?.key || WeightUnits.Kilogram,
        gdprConsent,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeSignUpStatus}
      modalBorder={modelBorderColor}
      modal={isModalOpen ? <BmeText align="center">{storeSignUpError || storeSignUpMessage}</BmeText> : undefined}
      onCloseModal={!storeSignUpMessage ? () => setIsModalOpen(false) : undefined}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="email"
            value={email}
            label={intl.formatMessage({ id: "common.form.email.label" })}
            onValue={setEmail}
            type="email"
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="firstName"
            value={firstName}
            label={intl.formatMessage({ id: "common.form.first_name.label" })}
            onValue={setFirstName}
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="lastName"
            value={lastName}
            label={intl.formatMessage({ id: "common.form.last_name.label" })}
            onValue={setLastName}
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="password"
            value={password}
            label={intl.formatMessage({ id: "common.form.password.label" })}
            onValue={setPassword}
            type="password"
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="passwordConfirm"
            value={passwordConfirm}
            label={intl.formatMessage({ id: "common.form.password_confirm.label" })}
            onValue={setPasswordConfirm}
            type="password"
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeSelect
            name="weightUnit"
            label={intl.formatMessage({ id: "common.form.weight_unit.label" })}
            list={weightUnitsList}
            value={weightUnit}
            onValue={setWeightUnit}
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeCheckbox
            name="gdprConsent"
            value={gdprConsent}
            label={intl.formatMessage({ id: "common.form.gdpr_consent.label" })}
            onValue={setGdprConsent}
          />
        </BmeBox>
        <BmeBox margin="no|no|lg">
          <BmeButton type="submit">
            <FormattedMessage id="common.form.submit.label" />
          </BmeButton>
        </BmeBox>
        <Link href="/auth/sign-in">
          <BmeButton size="small" variant="background">
            <FormattedMessage id="common.form.sign_in.label" />
          </BmeButton>
        </Link>
        <Link href="/privacy-policy">
          <BmeButton size="small" variant="background">
            <FormattedMessage id="common.form.read_gdpr.label" />
          </BmeButton>
        </Link>
      </BmeBox>
    </Form>
  );
};

export default Component;
