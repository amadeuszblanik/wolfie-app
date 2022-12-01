import React from "react";
import { FormattedMessage } from "react-intl";
import { DoggoBox, DoggoButton, DoggoModal, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { DoggoTextVariant, TextAlignment } from "../../ui-components/text";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { CommonErrorResponseModel } from "../../api/response-model/common-error.response-model";
import { ApiStatesTypes } from "../../types/api-states.types";

interface Props {
  entry: string;
  status: ApiStatesTypes;
  error: CommonErrorResponseModel | undefined;
  onClose: () => void;
  onRemove: () => void;
}

const Component: React.FunctionComponent<Props> = ({ entry, status, error, onClose, onRemove }) => (
  <DoggoModal onClose={onClose}>
    <DoggoBox width={BoxWidth.Full} alignX={FlexAlign.Center} column padding={{ bottom: SizesEnum.Medium }}>
      <DoggoBox padding={{ bottom: SizesEnum.Small }}>
        <DoggoText variant={DoggoTextVariant.Headline} align={TextAlignment.Center}>
          <FormattedMessage id="component.remove_entry_modal.title" />
        </DoggoText>
      </DoggoBox>
      <DoggoText variant={DoggoTextVariant.Headline} align={TextAlignment.Center}>
        <FormattedMessage id="component.remove_entry_modal.description" />: {entry || <DoggoPlaceholder />}
      </DoggoText>
    </DoggoBox>
    <DoggoBox width={BoxWidth.Full} alignX={FlexAlign.Center}>
      <DoggoBox padding={{ y: SizesEnum.Medium, x: SizesEnum.Medium }}>
        <DoggoButton onClick={onClose}>
          <FormattedMessage id="common.cancel" />
        </DoggoButton>
      </DoggoBox>
      <DoggoBox padding={{ y: SizesEnum.Medium, x: SizesEnum.Medium }}>
        <DoggoButton variant="red" onClick={onRemove} disabled={status === ApiStatesTypes.Loading}>
          <FormattedMessage id="common.delete" />
        </DoggoButton>
      </DoggoBox>
    </DoggoBox>
    {error && (
      <DoggoBox padding={{ top: SizesEnum.Medium }}>
        <DoggoText color="red">{error.message || <FormattedMessage id="common.error_message" />}</DoggoText>
      </DoggoBox>
    )}
  </DoggoModal>
);
export default Component;
