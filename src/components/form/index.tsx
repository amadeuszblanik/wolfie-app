import React from "react";
import styled from "styled-components";
import { BmeBox, BmeButton, bmeMixins, BmeModal } from "bme-ui";
import { FormattedMessage } from "react-intl";
import { ApiStatus } from "../../services/api/types/status.type";
import { Loader } from "../index";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  apiStatus?: ApiStatus;
  error?: string | null;
  success?: string | null;
  onCloseModal?: () => void;
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

const Component: FormType = ({ apiStatus, error, success, onCloseModal, children, ...props }) => {
  const isLoading = apiStatus === "pending";
  const isModalVisible = (!!error || !!success) && (apiStatus === "success" || apiStatus === "error");

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
