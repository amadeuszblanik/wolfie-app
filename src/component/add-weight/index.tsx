import React from "react";
import { useIntl } from "react-intl";
import { DoggoSheet } from "../../ui-components";
import { FormPetWeight } from "../../form";

interface Props {
  petId: string;
  onClose: () => void;
}

const Component: React.FunctionComponent<Props> = ({ petId, onClose }) => {
  const intl = useIntl();

  return (
    <DoggoSheet onClose={onClose} title={intl.formatMessage({ id: "page.pet_weight.header" })}>
      <FormPetWeight petId={petId} onSuccess={onClose} />
    </DoggoSheet>
  );
};
export default Component;
