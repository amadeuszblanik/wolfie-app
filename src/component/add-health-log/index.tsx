import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DoggoButton, DoggoSheet } from "../../ui-components";
import { toDate, toTime } from "../../utils";
import { PetWeightAddBody } from "../../api/types/pet-weight-add.types";
import { FormHealthLog } from "../../form";

interface Props {
  onClose: () => void;
  onAdd: (data: PetWeightAddBody) => void;
}

const DEFAULT_WEIGHT = 15;

const Component: React.FunctionComponent<Props> = ({ onClose, onAdd }) => {
  const intl = useIntl();

  const [date, setDate] = useState(toDate(new Date()));
  const [time, setTime] = useState(toTime(new Date()));
  const [weight, setWeight] = useState<string>(String(DEFAULT_WEIGHT));

  const handleAdd = () => {
    onAdd({
      weight: Number(weight),
      date: new Date(`${date} ${time}`),
    });
  };

  return (
    <DoggoSheet
      onClose={onClose}
      right={
        <DoggoButton onClick={handleAdd}>
          <FormattedMessage id="common.add" />
        </DoggoButton>
      }
      title={intl.formatMessage({ id: "page.pet_weight.header" })}
    >
      <FormHealthLog />
    </DoggoSheet>
  );
};
export default Component;
