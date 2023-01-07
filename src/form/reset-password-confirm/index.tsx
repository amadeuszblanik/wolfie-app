import { BmeBox, BmeButton, BmeInput, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useLayoutEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import {
  resetPasswordActions,
  selectResetPasswordPutData,
  selectResetPasswordPutError,
  selectResetPasswordPutStatus,
} from "../../store/reset-password.slice";

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeResetPasswordPutStatus = useAppSelector(selectResetPasswordPutStatus);
  const storeResetPasswordPutError = useAppSelector(selectResetPasswordPutError);
  const storeResetPasswordPutData = useAppSelector(selectResetPasswordPutData);

  const token = router.query.token as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useLayoutEffect(() => {
    if (storeResetPasswordPutError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (storeResetPasswordPutData) {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [storeResetPasswordPutError, storeResetPasswordPutData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      resetPasswordActions.put({
        password,
        passwordConfirm,
        token,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeResetPasswordPutStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">{storeResetPasswordPutError || storeResetPasswordPutData?.message}</BmeText>
        ) : undefined
      }
      onCloseModal={!storeResetPasswordPutData ? () => setIsModalOpen(false) : undefined}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
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
            name="password-confirm"
            value={passwordConfirm}
            label={intl.formatMessage({ id: "common.form.password_confirm.label" })}
            onValue={setPasswordConfirm}
            type="password"
            width="100%"
          />
        </BmeBox>
        <BmeButton type="submit">
          <FormattedMessage id="common.form.submit.label" />
        </BmeButton>
      </BmeBox>
    </Form>
  );
};

export default Component;