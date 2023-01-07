import { BmeBox, BmeButton, BmeInput, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useLayoutEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import {
  profileActions,
  selectProfileChangePasswordData,
  selectProfileChangePasswordError,
  selectProfileChangePasswordStatus,
} from "../../store/profile.slice";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeProfileChangePasswordStatus = useAppSelector(selectProfileChangePasswordStatus);
  const storeProfileChangePasswordError = useAppSelector(selectProfileChangePasswordError);
  const storeProfileChangePasswordData = useAppSelector(selectProfileChangePasswordData);

  const isError = storeProfileChangePasswordStatus === "error";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  useEffect(() => {
    dispatch(profileActions.resetChangePassword());
    setIsModalOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (storeProfileChangePasswordError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (storeProfileChangePasswordStatus === "success") {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [storeProfileChangePasswordError, storeProfileChangePasswordStatus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      profileActions.changePassword({
        currentPassword,
        newPassword,
        newPasswordConfirm,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeProfileChangePasswordStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? storeProfileChangePasswordError ||
                intl.formatMessage({ id: "common.form.profile_change_password.error" })
              : storeProfileChangePasswordData?.message ||
                intl.formatMessage({ id: "common.form.profile_change_password.success" })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="current-password"
            value={currentPassword}
            label={intl.formatMessage({ id: "common.form.current_password.label" })}
            onValue={setCurrentPassword}
            type="password"
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="new-password"
            value={newPassword}
            label={intl.formatMessage({ id: "common.form.new_password.label" })}
            onValue={setNewPassword}
            type="password"
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="new-password-confirm"
            value={newPasswordConfirm}
            label={intl.formatMessage({ id: "common.form.new_password_confirm.label" })}
            onValue={setNewPasswordConfirm}
            type="password"
            width="100%"
          />
        </BmeBox>
        <BmeBox margin="no|no|lg">
          <BmeButton type="submit">
            <FormattedMessage id="common.form.submit.label" />
          </BmeButton>
        </BmeBox>
      </BmeBox>
    </Form>
  );
};

export default Component;
