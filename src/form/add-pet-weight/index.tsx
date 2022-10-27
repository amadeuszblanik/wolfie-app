import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  DoggoBox,
  DoggoButton,
  DoggoForm,
  DoggoFormControl,
  DoggoGrid,
  DoggoInputDate,
  DoggoInputNumber,
  DoggoInputTime,
  DoggoText,
} from "../../ui-components";
import { ApiStatesTypes } from "../../types/api-states.types";
import useFormValidator, { FormValidators } from "../../form-validator";
import { toDate, toTime } from "../../utils";
import { WeightUnits } from "../../api/types/weight-units.types";
import { usePostPetWeightById } from "../../api/queries";
import { DEFAULT_ON_SUCCESS_TIMEOUT } from "../../settings/globals";

const LOWEST_WEIGHT = 0.1;

interface Props {
  petId: string;
  weightUnit: WeightUnits;
  onSuccess: () => void;
}

const Form: React.FunctionComponent<Props> = ({ petId, weightUnit, onSuccess }) => {
  const intl = useIntl();
  const { post, status, response, error } = usePostPetWeightById(petId);

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [date, setDate] = useState<string | undefined>(toDate(new Date()));
  const [time, setTime] = useState<string | undefined>(toTime(new Date()));
  const [weight, setWeight] = useState<number | undefined>(undefined);

  const formValidator = useFormValidator([
    { name: "date", value: date, validator: [FormValidators.Required] },
    { name: "time", value: time, validator: [FormValidators.Required] },
    {
      name: "weight",
      value: weight,
      validator: [FormValidators.Required, FormValidators.MoreThan],
      additionalValues: [LOWEST_WEIGHT],
    },
  ]);

  useEffect(() => {
    setSubmitEnable(formValidator.formValid);
  }, [formValidator.formValid]);

  useEffect(() => {
    switch (status) {
      case ApiStatesTypes.Loading:
        setFormEnable(false);
        break;
      case ApiStatesTypes.Success:
        setFormEnable(false);
        break;
      default:
        setFormEnable(true);
    }
  }, [status]);

  const handleSubmit = () => {
    if (!date || !time || !weight) {
      // @TODO Add better form error handling
      return;
    }

    post({
      date: new Date(`${date} ${time}`),
      weight,
    });
  };

  useEffect(() => {
    if (status === ApiStatesTypes.Success) {
      setTimeout(onSuccess, DEFAULT_ON_SUCCESS_TIMEOUT);
    }
  }, [status, onSuccess]);

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoFormControl label={intl.formatMessage({ id: "common.date" })} errors={formValidator.errors.date}>
        <DoggoInputDate value={date} onChange={setDate} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "common.time" })} errors={formValidator.errors.time}>
        <DoggoInputTime value={time} onChange={setTime} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoFormControl
        label={intl.formatMessage({ id: "common.weight" })}
        errors={formValidator.errors.weight}
        suffix={weightUnit}
      >
        <DoggoInputNumber value={weight} onChange={setWeight} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoBox column>
        <DoggoGrid mobile={1} desktop={1}>
          <DoggoButton variant="green" type="submit" disabled={!submitEnable}>
            <FormattedMessage id="common.add" />
          </DoggoButton>
        </DoggoGrid>
        {error && (
          <DoggoBox>
            <DoggoText color="red">{error.message}</DoggoText>
          </DoggoBox>
        )}
        {response && (
          <DoggoBox>
            <DoggoText color="green">
              <FormattedMessage id="common.success_message" />
            </DoggoText>
          </DoggoBox>
        )}
      </DoggoBox>
    </DoggoForm>
  );
};

export default Form;
