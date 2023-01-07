import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { BmeBox, BmeButton, BmeProgressBar, BmeText } from "bme-ui";
import { useEffect } from "react";
import { LayoutAuth } from "../../../src/layouts";
import { ErrorMessage } from "../../../src/components";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import {
  confirmEmailActions,
  selectConfirmEmailPostData,
  selectConfirmEmailPostError,
  selectConfirmEmailPostStatus,
} from "../../../src/store/confrim-email.slice";
import { Link } from "../../../src/atoms";

export default function Page() {
  const router = useRouter();
  const intl = useIntl();
  const token = router.query.token as string;
  const dispatch = useAppDispatch();
  const storeConfirmEmailPostStatus = useAppSelector(selectConfirmEmailPostStatus);
  const storeConfirmEmailPostError = useAppSelector(selectConfirmEmailPostError);
  const storeConfirmEmailPostData = useAppSelector(selectConfirmEmailPostData);

  const isLoading = storeConfirmEmailPostStatus === "pending" || storeConfirmEmailPostStatus === "idle";
  const isError = storeConfirmEmailPostStatus === "error";
  const isSuccess = storeConfirmEmailPostStatus === "success";

  useEffect(() => {
    dispatch(confirmEmailActions.post({ token }));
  }, [token]);

  if (!token) {
    return (
      <LayoutAuth title={intl.formatMessage({ id: "page.auth_email_verification.title" })}>
        <ErrorMessage messages={[intl.formatMessage({ id: "page.auth_email_verification.missing_token_title" })]} />
      </LayoutAuth>
    );
  }

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_email_verification.title" })}>
      {isLoading && <BmeProgressBar />}
      {isError && (
        <ErrorMessage messages={[storeConfirmEmailPostError || intl.formatMessage({ id: "error.generic_fetch" })]} />
      )}
      {isSuccess && (
        <BmeBox direction="column" alignX="center" alignY="center">
          <BmeBox margin="no|no|sm">
            <BmeText>
              {storeConfirmEmailPostData?.message || intl.formatMessage({ id: "page.auth_email_verification.success" })}
            </BmeText>
          </BmeBox>
          <Link href="/auth/sign-in">
            <BmeButton>
              <BmeText>{intl.formatMessage({ id: "page.auth_email_verification.sign_in" })}</BmeText>
            </BmeButton>
          </Link>
        </BmeBox>
      )}
    </LayoutAuth>
  );
}
