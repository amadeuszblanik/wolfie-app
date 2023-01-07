import { useIntl } from "react-intl";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { BmeProgressBar } from "bme-ui";
import { LayoutAuth } from "../../../src/layouts";
import { useAppDispatch } from "../../../src/hooks";
import { authActions } from "../../../src/store/auth.slice";

export default function Page() {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.signOff());
    void router.push("/auth/sign-in");
  });

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_sign_in.title" })}>
      <BmeProgressBar />
    </LayoutAuth>
  );
}
