import React from "react";
import { useIntl } from "react-intl";
import { DoggoSheet } from "../../ui-components";
import { FormHealthLog } from "../../form";

interface Props {
  petId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const Component: React.FunctionComponent<Props> = ({ onClose, onSuccess, petId }) => {
  const intl = useIntl();

  return (
    <DoggoSheet onClose={onClose} title={intl.formatMessage({ id: "page.pet_health_log.header" })}>
      <FormHealthLog petId={petId} onSuccess={onSuccess} />
    </DoggoSheet>
  );
};
export default Component;
