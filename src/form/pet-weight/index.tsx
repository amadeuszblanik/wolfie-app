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
  DoggoPlaceholder,
  DoggoText,
} from "../../ui-components";
import { ApiStatesTypes } from "../../types/api-states.types";
import useFormValidator, { FormValidators } from "../../form-validator";
import { toDate, toTime } from "../../utils";
import { WeightUnits } from "../../api/types/weight-units.types";
import { usePatchPetWeightSingleById, usePostPetWeightById } from "../../api/queries";
import { DEFAULT_ON_SUCCESS_TIMEOUT } from "../../settings/globals";
import { WeightValueResponseModel } from "../../api/response-model/weight-value.response-model";

const LOWEST_WEIGHT = 0.1;

interface Props {
  petId: string;
  weightId?: string;
  initialData?: WeightValueResponseModel;
  weightUnit: WeightUnits;
  onSuccess?: () => void;
  loading?: boolean;
}

const Form: React.FunctionComponent<Props> = ({ petId, weightId, initialData, weightUnit, onSuccess, loading }) => {
  const intl = useIntl();
  const { post: addPost, status: addStatus, response: addResponse, error: addError } = usePostPetWeightById(petId);
  const {
    patch: updatePatch,
    status: updateStatus,
    response: updateResponse,
    error: updateError,
  } = usePatchPetWeightSingleById(petId, weightId || "null");

  const status = weightId ? updateStatus : addStatus;
  const response = weightId ? updateResponse : addResponse;
  const error = weightId ? updateError : addError;

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [date, setDate] = useState<string | undefined>(initialData ? toDate(initialData.date) : toDate(new Date()));
  const [time, setTime] = useState<string | undefined>(initialData ? toTime(initialData.date) : toTime(new Date()));
  const [weight, setWeight] = useState<number | undefined>(initialData?.raw);

  useEffect(() => {
    if (loading || !initialData) {
      return;
    }

    setDate(toDate(initialData.date));
    setTime(toTime(initialData.date));
    setWeight(initialData.raw);
  }, [loading, initialData]);

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

    if (weightId) {
      updatePatch({
        date: new Date(`${date} ${time}`),
        weight,
      });

      return;
    }

    addPost({
      date: new Date(`${date} ${time}`),
      weight,
    });
  };

  useEffect(() => {
    if (status === ApiStatesTypes.Success && onSuccess) {
      setTimeout(onSuccess, DEFAULT_ON_SUCCESS_TIMEOUT);
    }
  }, [status, onSuccess]);

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoFormControl label={intl.formatMessage({ id: "common.date" })} errors={formValidator.errors.date}>
        {!loading ? <DoggoInputDate value={date} onChange={setDate} disabled={!formEnable} /> : <DoggoPlaceholder />}
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "common.time" })} errors={formValidator.errors.time}>
        {!loading ? <DoggoInputTime value={time} onChange={setTime} disabled={!formEnable} /> : <DoggoPlaceholder />}
      </DoggoFormControl>
      <DoggoFormControl
        label={intl.formatMessage({ id: "common.weight" })}
        errors={formValidator.errors.weight}
        suffix={weightUnit}
      >
        {!loading ? (
          <DoggoInputNumber value={weight} onChange={setWeight} disabled={!formEnable} />
        ) : (
          <DoggoPlaceholder />
        )}
      </DoggoFormControl>
      <DoggoBox column>
        <DoggoGrid mobile={1} desktop={1}>
          <DoggoButton variant="green" type="submit" disabled={!submitEnable}>
            <FormattedMessage id={weightId ? "common.update" : "common.add"} />
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
