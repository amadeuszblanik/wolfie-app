import { BmeBox, BmeButton, BmeCheckbox, BmeInput, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";
import { authActions, selectAuthError, selectAuthStatus } from "../../store/auth.slice";
import { Form } from "../../components";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const storeAuthStatus = useAppSelector(selectAuthStatus);
  const storeAuthError = useAppSelector(selectAuthError);
  const deviceName = useDeviceName();

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignIn, setKeepSignIn] = useState(true);

  useLayoutEffect(() => {
    if (storeAuthError) {
      setIsErrorVisible(true);
    }

    switch (storeAuthStatus) {
      case "success":
        void router.push("/app");
        break;
    }
  }, [storeAuthStatus, storeAuthError, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      authActions.signIn({
        username,
        password,
        keepSignIn,
        device: deviceName,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeAuthStatus}
      modalBorder="red"
      modal={isErrorVisible ? <BmeText align="center">{storeAuthError}</BmeText> : undefined}
      onCloseModal={() => setIsErrorVisible(false)}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%">
        <BmeBox margin="no|no|sm">
          <BmeInput
            name="username"
            value={username}
            label={intl.formatMessage({ id: "common.form.username.label" })}
            onValue={setUsername}
            type="email"
          />
        </BmeBox>
        <BmeBox margin="no|no|sm">
          <BmeInput
            name="password"
            value={password}
            label={intl.formatMessage({ id: "common.form.password.label" })}
            onValue={setPassword}
            type="password"
          />
        </BmeBox>
        <BmeBox margin="no|no|sm">
          <BmeCheckbox
            name="sign-in"
            value={keepSignIn}
            label={intl.formatMessage({ id: "common.form.keep_sign_in.label" })}
            onValue={setKeepSignIn}
          />
        </BmeBox>
        <BmeBox margin="no|no|lg">
          <BmeButton type="submit">
            <FormattedMessage id="common.form.submit.label" />
          </BmeButton>
        </BmeBox>
        <BmeButton size="small" variant="background">
          <FormattedMessage id="common.form.create_account.label" />
        </BmeButton>
        <BmeButton size="small" variant="background">
          <FormattedMessage id="common.form.reset_password.label" />
        </BmeButton>
      </BmeBox>
    </Form>
  );
};

export default Component;
