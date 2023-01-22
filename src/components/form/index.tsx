import styled, { DefaultTheme } from "styled-components";
import React from "react";
import { BmeBox, BmeIcon, bmeMixins, BmeProgressBar } from "bme-ui";
import { ApiStatus } from "../../services/api/types/status.type";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactElement;
  apiStatus?: ApiStatus;
  modal?: React.ReactElement;
  onCloseModal?: () => void;
  modalBorder?: keyof DefaultTheme["colors"];
}

const StyledFormWrapper = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  ${bmeMixins.paddings("md|md")}
  border-radius: ${({ theme }) => theme.radius}px;
`;

const StyledFormModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(5px);
`;

const StyledFormModalCloseButton = styled.button`
  ${bmeMixins.paddings("no|no|sm")}
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  cursor: pointer;
  appearance: none;
`;

const Component: React.FC<FormProps> = ({ children, apiStatus, modal, onCloseModal, modalBorder, ...props }) => (
  <StyledFormWrapper {...props}>
    {children}
    {apiStatus === "pending" && (
      <StyledFormModal>
        <BmeBox width="100%" padding="sm|md">
          <BmeProgressBar />
        </BmeBox>
      </StyledFormModal>
    )}
    {modal && (
      <StyledFormModal>
        <BmeBox
          direction="column"
          alignX="center"
          width="80%"
          padding="sm|md"
          border={modalBorder}
          background="backgroundSecondary"
          rounded
        >
          {onCloseModal && (
            <BmeBox width="100%" alignX="right">
              <StyledFormModalCloseButton onClick={onCloseModal}>
                <BmeIcon name="close-circle" />
              </StyledFormModalCloseButton>
            </BmeBox>
          )}
          {modal}
        </BmeBox>
      </StyledFormModal>
    )}
  </StyledFormWrapper>
);

Component.defaultProps = {
  modalBorder: "blue",
};

export default Component;
