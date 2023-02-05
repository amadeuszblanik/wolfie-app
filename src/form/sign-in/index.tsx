import { BmeBox, BmeButton, BmeCheckbox, BmeInput, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";
import { authActions, selectAuthError, selectAuthStatus } from "../../store/auth.slice";
import { FormDeprecated } from "../../components";
import { Link } from "../../atoms";

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

  useEffect(() => {
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
    <FormDeprecated
      onSubmit={handleSubmit}
      apiStatus={storeAuthStatus}
      modalBorder="red"
      modal={isErrorVisible ? <BmeText align="center">{storeAuthError}</BmeText> : undefined}
      onCloseModal={() => setIsErrorVisible(false)}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="username"
            value={username}
            label={intl.formatMessage({ id: "common.form.username.label" })}
            onValue={setUsername}
            type="email"
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
        <Link href="/auth/sign-up">
          <BmeButton size="small" variant="background">
            <FormattedMessage id="common.form.create_account.label" />
          </BmeButton>
        </Link>
        <Link href="/auth/forgot-password">
          <BmeButton size="small" variant="background">
            <FormattedMessage id="common.form.reset_password.label" />
          </BmeButton>
        </Link>
      </BmeBox>
    </FormDeprecated>
  );
};

export default Component;
