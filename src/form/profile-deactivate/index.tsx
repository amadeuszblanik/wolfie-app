import { BmeButton, BmeCheckbox, BmeInput, BmeList, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormDeprecated } from "../../components";
import {
  profileActions,
  selectProfileDeactivateAccountData,
  selectProfileDeactivateAccountError,
  selectProfileDeactivateAccountStatus,
} from "../../store/profile.slice";

const SIGN_OFF_TIMEOUT = 5000;

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeProfileDeactivateAccountStatus = useAppSelector(selectProfileDeactivateAccountStatus);
  const storeProfileDeactivateAccountError = useAppSelector(selectProfileDeactivateAccountError);
  const storeProfileDeactivateAccountData = useAppSelector(selectProfileDeactivateAccountData);

  const isError = storeProfileDeactivateAccountStatus === "error" || !!storeProfileDeactivateAccountError;
  const isSuccess = storeProfileDeactivateAccountStatus === "success";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [approve, setApprove] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
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
      profileActions.deactivateAccount({
        password,
      }),
    );
  };

  return (
    <FormDeprecated
      onSubmit={handleSubmit}
      apiStatus={storeProfileDeactivateAccountStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? storeProfileDeactivateAccountError || intl.formatMessage({ id: "common.form.profile_deactivate.error" })
              : storeProfileDeactivateAccountData?.message ||
                intl.formatMessage({ id: "common.form.profile_deactivate.success" })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <BmeList label={intl.formatMessage({ id: "common.form.profile_deactivate.label" })}>
        <BmeList.Item>
          <BmeText>
            <FormattedMessage id="common.form.profile_deactivate.warning" />
          </BmeText>
        </BmeList.Item>
        <BmeList.Item>
          <BmeCheckbox
            name="delete-approve"
            label={intl.formatMessage({ id: "common.form.profile_deactivate.checkbox" })}
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
            <FormattedMessage id="common.form.profile_deactivate.button" />
          </BmeButton>
        </BmeList.Item>
      </BmeList>
    </FormDeprecated>
  );
};

export default Component;
