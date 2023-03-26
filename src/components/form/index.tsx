import React from "react";
import styled from "styled-components";
import { BmeBox, BmeButton, bmeMixins, BmeModal } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { ApiStatus } from "../../services/api/types/status.type";
import { ErrorMessage, Loader } from "../index";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  apiStatus?: ApiStatus;
  error?: string | null;
  success?: string | null;
  onCloseModal?: () => void;
  loadFailed?: boolean;
  loadFailedMessage?: string | null;
  onTryAgain?: () => void;
  children: JSX.Element | JSX.Element[];
}

type FormType = React.FC<FormProps>;

export const StyledFormWrapper = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  ${bmeMixins.paddings("md|md")}
  border-radius: ${({ theme }) => theme.radius}px;
`;

const Component: FormType = ({
  apiStatus,
  error,
  success,
  onCloseModal,
  loadFailed,
  loadFailedMessage,
  onTryAgain,
  children,
  ...props
}) => {
  const intl = useIntl();
  const isLoading = apiStatus === "pending";
  const isModalVisible = (!!error || !!success) && (apiStatus === "success" || apiStatus === "error");

  if (loadFailed) {
    return (
      <ErrorMessage
        title={intl.formatMessage({ id: "form.load_error.title" })}
        messages={[loadFailedMessage || intl.formatMessage({ id: "form.load_error.message" })]}
        onTryAgain={onTryAgain}
      />
    );
  }

  return (
    <StyledFormWrapper {...props}>
      <BmeBox direction="column" width="100%" margin="no|no|sm">
        {isLoading && <Loader />}
        {isModalVisible && <BmeModal onClose={onCloseModal}>{error || success}</BmeModal>}
        {children}
      </BmeBox>
      <BmeButton type="submit">
        <FormattedMessage id="common.form.submit.label" />
      </BmeButton>
    </StyledFormWrapper>
  );
};

export default Component;
