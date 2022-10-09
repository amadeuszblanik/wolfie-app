import React from "react";
import { useIntl } from "react-intl";
import { DoggoSheet } from "../../ui-components";
import { FormHealthLog } from "../../form";

interface Props {
  petId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DEFAULT_WEIGHT = 15;

const Component: React.FunctionComponent<Props> = ({ onClose, onSuccess, petId }) => {
  const intl = useIntl();

  return (
    <DoggoSheet onClose={onClose} title={intl.formatMessage({ id: "page.pet_weight.header" })}>
      <FormHealthLog petId={petId} onSuccess={onSuccess} />
    </DoggoSheet>
  );
};
export default Component;