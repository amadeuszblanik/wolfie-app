import { BmeBox, BmeButton } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";
import { authActions, selectAuthError, selectAuthStatus } from "../../store/auth.slice";
import { FormBuilder } from "../../components";
import { Link } from "../../atoms";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const storeAuthStatus = useAppSelector(selectAuthStatus);
  const storeAuthError = useAppSelector(selectAuthError);
  const deviceName = useDeviceName();

  useEffect(() => {
    switch (storeAuthStatus) {
      case "success":
        void router.push("/app");
        break;
    }
  }, [storeAuthStatus, router]);

  return (
    <>
      <BmeBox alignX="center" width="100%" margin="md|no">
        <FormBuilder
          apiStatus={storeAuthStatus}
          apiError={storeAuthError}
          onErrorClose={() => {
            dispatch(authActions.resetSignIn());
          }}
          controls={[
            {
              type: "email",
              name: "username",
              label: intl.formatMessage({ id: "common.form.username.label" }),
              validators: ["required", "email"],
            },
            {
              type: "password",
              name: "password",
              label: intl.formatMessage({ id: "common.form.password.label" }),
              validators: ["required"],
            },
            {
              type: "checkbox",
              name: "keepSignIn",
              label: intl.formatMessage({ id: "common.form.keep_sign_in.label" }),
            },
          ]}
          onSubmit={(values) => {
            dispatch(
              authActions.signIn({
                username: String(values.username),
                password: String(values.password),
                keepSignIn: values.keepSignIn === "true",
                device: deviceName,
              }),
            );
          }}
        >
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
        </FormBuilder>
      </BmeBox>
    </>
  );
};

export default Component;
