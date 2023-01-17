import { BmeBox, BmeButton, BmeInput, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import {
  resetPasswordActions,
  selectResetPasswordGetData,
  selectResetPasswordGetError,
  selectResetPasswordGetStatus,
} from "../../store/reset-password.slice";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeResetPasswordGetStatus = useAppSelector(selectResetPasswordGetStatus);
  const storeResetPasswordGetError = useAppSelector(selectResetPasswordGetError);
  const storeResetPasswordGetData = useAppSelector(selectResetPasswordGetData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (storeResetPasswordGetError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (storeResetPasswordGetData) {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [storeResetPasswordGetError, storeResetPasswordGetData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      resetPasswordActions.get({
        userEmail,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeResetPasswordGetStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">{storeResetPasswordGetError || storeResetPasswordGetData?.message}</BmeText>
        ) : undefined
      }
      onCloseModal={!storeResetPasswordGetData ? () => setIsModalOpen(false) : undefined}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="user-email"
            value={userEmail}
            label={intl.formatMessage({ id: "common.form.email.label" })}
            onValue={setUserEmail}
            type="email"
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
