import React from "react";
import { BmeBox, BmeButton, BmeModal, BmeProgressBar, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import { ApiStatus } from "../../services/api/types/status.type";

// @TODO Fix progress bar label - bme-ui

interface RemoveEntryModalProps {
  apiStatus: ApiStatus;
  error: string | null;
  success: string | null;
  onRemove: () => void;
  onCancel: () => void;
  onSuccess: () => void;
}

const Component: React.FC<RemoveEntryModalProps> = ({ apiStatus, error, success, onRemove, onCancel, onSuccess }) => {
  const isLoading = apiStatus === "pending";
  const isSuccess = apiStatus === "success";
  const isError = apiStatus === "error";

  const isProgressVisible = isLoading || isSuccess || isError;

  const DefaultContent = () => (
    <BmeBox direction="column" alignX="center">
      <BmeBox margin="no|no|xs">
        <BmeText variant="Title1" align="center">
          <FormattedMessage id="common.component.remove_entry_modal.title" />
        </BmeText>
      </BmeBox>
      <BmeBox margin="no|no|sm">
        <BmeText>
          <FormattedMessage id="common.component.remove_entry_modal.description" />
        </BmeText>
      </BmeBox>
      <BmeBox margin={isProgressVisible ? "no|no|md" : "no"}>
        <BmeBox padding="no|xs">
          <BmeButton variant="red" size="small" onClick={onCancel} disabled={isLoading}>
            <FormattedMessage id="common.component.remove_entry_modal.cancel" />
          </BmeButton>
        </BmeBox>
        <BmeBox padding="no|xs">
          <BmeButton size="small" onClick={onRemove} disabled={isLoading}>
            <FormattedMessage id="common.component.remove_entry_modal.confirm" />
          </BmeButton>
        </BmeBox>
      </BmeBox>
      {isProgressVisible && <BmeProgressBar label="&nbsp;" error={error || ""} done={success || ""} />}
    </BmeBox>
  );

  const SuccessContent = () => (
    <BmeBox direction="column" alignX="center">
      <BmeBox margin="no|no|xs">
        <BmeText variant="Title1" align="center">
          <FormattedMessage id="common.component.remove_entry_modal.success.title" />
        </BmeText>
      </BmeBox>
      <BmeBox margin="no|no|sm">
        <BmeText>
          {success || <FormattedMessage id="common.component.remove_entry_modal.success.description" />}
        </BmeText>
      </BmeBox>
      <BmeBox>
        <BmeButton
          size="small"
          onClick={() => {
            onCancel();
            onSuccess();
          }}
        >
          <FormattedMessage id="common.component.remove_entry_modal.success.close" />
        </BmeButton>
      </BmeBox>
    </BmeBox>
  );

  return (
    <BmeModal>
      {!isSuccess && <DefaultContent />}
      {isSuccess && <SuccessContent />}
    </BmeModal>
  );
};

Component.defaultProps = {};

export default Component;
