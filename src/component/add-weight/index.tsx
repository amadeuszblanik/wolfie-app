import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DoggoButton, DoggoInput, DoggoListDeprecated, DoggoSheet } from "../../ui-components";
import { toDate, toTime } from "../../utils";
import { InputTypes } from "../../ui-components/input";
import { PetWeightAddBody } from "../../api/types/pet-weight-add.types";
import { WeightUnits } from "../../api/types/weight-units.types";

interface Props {
  onClose: () => void;
}

const DEFAULT_WEIGHT = 15;

const Component: React.FunctionComponent<Props> = ({ onClose }) => {
  const unit = WeightUnits.Kilogram;
  const onAdd = (_data: PetWeightAddBody) => {
    // @TODO Handle this one
    onClose();
  };

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
      <DoggoListDeprecated
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
              value={weight}
              onChange={(nextValue) => setWeight(nextValue)}
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
