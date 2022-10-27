import React from "react";
import { useIntl } from "react-intl";
import { DoggoSheet } from "../../ui-components";
import { WeightUnits } from "../../api/types/weight-units.types";
import { FormAddPetWeight } from "../../form";

interface Props {
  petId: string;
  onClose: () => void;
}

const Component: React.FunctionComponent<Props> = ({ petId, onClose }) => {
  const unit = WeightUnits.Kilogram;
  const intl = useIntl();

  return (
    <DoggoSheet onClose={onClose} title={intl.formatMessage({ id: "page.pet_weight.header" })}>
      <FormAddPetWeight petId={petId} weightUnit={unit} onSuccess={onClose} />
    </DoggoSheet>
  );
};
export default Component;
