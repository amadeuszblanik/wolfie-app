import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DoggoButton, DoggoInput, DoggoList, DoggoSheet } from "../../ui-components";
import { toDate, toTime } from "../../utils";
import { InputTypes } from "../../ui-components/input";
import { PetWeightAddBody } from "../../api/types/pet-weight-add.types";

interface Props {
  onClose: () => void;
  onAdd: (data: PetWeightAddBody) => void;
  unit: string;
}

const DEFAULT_WEIGHT = 15;

const Component: React.FunctionComponent<Props> = ({ onClose, onAdd, unit }) => {
  const intl = useIntl();

  const [date, setDate] = useState(toDate(new Date()));
  const [time, setTime] = useState(toTime(new Date()));
  const [weight, setWeight] = useState<number>(DEFAULT_WEIGHT);

  const handleAdd = () => {
    onAdd({
      weight: weight,
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
      <DoggoList
        items={[
          [
            <FormattedMessage key="dateLabel" id="common.date" />,
            <DoggoInput
              key="dateInput"
              value={date}
              max={toDate(new Date())}
              onChange={setDate}
              type={InputTypes.Date}
              plain
            />,
          ],
          [
            <FormattedMessage key="timeLabel" id="common.time" />,
            <DoggoInput
              key="timeInput"
              value={time}
              max={toTime(new Date())}
              onChange={setTime}
              type={InputTypes.Time}
              plain
            />,
          ],
          [
            unit,
            <DoggoInput
              key="weightInput"
              value={String(weight)}
              onChange={(nextValue) => setWeight(Number(nextValue))}
              type={InputTypes.Number}
              plain
            />,
          ],
        ]}
      />
    </DoggoSheet>
  );
};
export default Component;
