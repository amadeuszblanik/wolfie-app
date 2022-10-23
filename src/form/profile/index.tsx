import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  DoggoBox,
  DoggoButton,
  DoggoForm,
  DoggoFormControl,
  DoggoGrid,
  DoggoInputText,
  DoggoSelect,
  DoggoText,
} from "../../ui-components";
import { ApiStatesTypes } from "../../types/api-states.types";
import useFormValidator, { FormValidators } from "../../form-validator";
import useUpdateProfile from "../../api/queries/update-profile";
import { WeightUnits } from "../../api/types/weight-units.types";
import { enumToList } from "../../utils";
import { ProfilePayload } from "../../api/payload/profile.payload";

interface Props {
  initialValues: ProfilePayload;
}

const Form: React.FunctionComponent<Props> = ({ initialValues }) => {
  const intl = useIntl();
  const { post, status, response, error } = useUpdateProfile();

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [firstName, setFirstName] = useState(initialValues.firstName || "");
  const [lastName, setLastName] = useState(initialValues.lastName || "");
  const [weightUnit, setWeightUnit] = useState<WeightUnits | undefined>(initialValues.weightUnit);

  const formValidator = useFormValidator([
    { name: "firstName", value: firstName, validator: [FormValidators.Required, FormValidators.Name] },
    { name: "lastName", value: lastName, validator: [FormValidators.Required, FormValidators.Name] },
    { name: "weightUnit", value: weightUnit, validator: [FormValidators.Required] },
  ]);

  useEffect(() => {
    console.warn("FormProfile:useEffect:formValidator", formValidator);

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
    post({
      firstName,
      lastName,
      weightUnit,
    });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoFormControl label={intl.formatMessage({ id: "user.first_name" })} errors={formValidator.errors.firstName}>
        <DoggoInputText value={firstName} onChange={setFirstName} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "user.last_name" })} errors={formValidator.errors.lastName}>
        <DoggoInputText value={lastName} onChange={setLastName} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "user.weight_unit" })} errors={formValidator.errors.weightUnit}>
        <DoggoSelect
          value={weightUnit}
          onChange={(nextValue) => setWeightUnit(nextValue as WeightUnits)}
          disabled={!formEnable}
          list={enumToList(WeightUnits, true)}
        />
      </DoggoFormControl>
      <DoggoBox column>
        <DoggoGrid mobile={1} desktop={1}>
          <DoggoButton variant="green" type="submit" disabled={!submitEnable}>
            <FormattedMessage id="common.update" />
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
