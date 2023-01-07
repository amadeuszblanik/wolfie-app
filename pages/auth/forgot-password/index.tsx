import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { BmeBox, BmeButton, BmeText } from "bme-ui";
import { LayoutAuth } from "../../../src/layouts";
import { FormResetPassword, FormResetPasswordConfirm } from "../../../src/form";
import { useAppSelector } from "../../../src/hooks";
import { selectResetPasswordPutData, selectResetPasswordPutStatus } from "../../../src/store/reset-password.slice";
import { Link } from "../../../src/atoms";

export default function Page() {
  const router = useRouter();
  const intl = useIntl();

  const token = router.query.token as string;

  const storeResetPasswordPutStatus = useAppSelector(selectResetPasswordPutStatus);
  const storeResetPasswordPutData = useAppSelector(selectResetPasswordPutData);

  const isPutSuccess = storeResetPasswordPutStatus === "success";

  if (!token) {
    return (
      <LayoutAuth title={intl.formatMessage({ id: "page.forgot_password.title" })}>
        <FormResetPassword />
      </LayoutAuth>
    );
  }

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.forgot_password.title" })}>
      {!isPutSuccess && <FormResetPasswordConfirm />}
      {isPutSuccess && (
        <BmeBox direction="column" alignX="center" alignY="center">
          <BmeBox margin="no|no|sm">
            <BmeText>
              {storeResetPasswordPutData?.message || intl.formatMessage({ id: "page.auth_forgot_password.success" })}
            </BmeText>
          </BmeBox>
          <Link href="/auth/sign-in">
            <BmeButton>
              <BmeText>{intl.formatMessage({ id: "page.auth_forgot_password.sign_in" })}</BmeText>
            </BmeButton>
          </Link>
        </BmeBox>
      )}
    </LayoutAuth>
  );
}
