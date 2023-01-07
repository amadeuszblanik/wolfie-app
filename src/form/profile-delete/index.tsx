import { BmeButton, BmeCheckbox, BmeInput, BmeList, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useLayoutEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import {
  profileActions,
  selectProfileDeleteAccountData,
  selectProfileDeleteAccountError,
  selectProfileDeleteAccountStatus,
} from "../../store/profile.slice";

const SIGN_OFF_TIMEOUT = 5000;

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeProfileDeleteAccountStatus = useAppSelector(selectProfileDeleteAccountStatus);
  const storeProfileDeleteAccountError = useAppSelector(selectProfileDeleteAccountError);
  const storeProfileDeleteAccountData = useAppSelector(selectProfileDeleteAccountData);

  const isError = storeProfileDeleteAccountStatus === "error" || !!storeProfileDeleteAccountError;
  const isSuccess = storeProfileDeleteAccountStatus === "success";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [approve, setApprove] = useState(false);
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    if (isError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (isSuccess) {
      setIsModalOpen(true);
      setModelBorderColor("green");

      setTimeout(() => {
        void router.push("/auth/sign-in");
      }, SIGN_OFF_TIMEOUT);
    }
  }, [isError, isSuccess]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      profileActions.deleteAccount({
        password,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeProfileDeleteAccountStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? storeProfileDeleteAccountError || intl.formatMessage({ id: "common.form.profile_delete.error" })
              : storeProfileDeleteAccountData?.message ||
                intl.formatMessage({ id: "common.form.profile_delete.success" })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <BmeList label={intl.formatMessage({ id: "common.form.profile_delete.label" })}>
        <BmeList.Item>
          <BmeText>
            <FormattedMessage id="common.form.profile_delete.warning" />
          </BmeText>
        </BmeList.Item>
        <BmeList.Item>
          <BmeCheckbox
            name="delete-approve"
            label={intl.formatMessage({ id: "common.form.profile_delete.checkbox" })}
            value={approve}
            onValue={setApprove}
          />
        </BmeList.Item>
        <BmeList.Item>
          <BmeInput
            name="password"
            value={password}
            label={intl.formatMessage({ id: "common.form.password.label" })}
            onValue={setPassword}
            width="100%"
            type="password"
          />
        </BmeList.Item>
        <BmeList.Item>
          <BmeButton width="100%" variant="red" disabled={!approve}>
            <FormattedMessage id="common.form.profile_delete.button" />
          </BmeButton>
        </BmeList.Item>
      </BmeList>
    </Form>
  );
};

export default Component;
