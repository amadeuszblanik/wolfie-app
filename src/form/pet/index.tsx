import React, { useEffect, useState } from "react";
import {
  DoggoBox,
  DoggoButton,
  DoggoForm,
  DoggoFormControl,
  DoggoInputDate,
  DoggoInputText,
  DoggoLoader,
  DoggoText,
} from "../../ui-components";
import { FormattedMessage, useIntl } from "react-intl";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import { useGetPetsById, usePostPetsNew, usePutPetsById } from "../../api/queries";
import { toDate } from "../../utils";
import { ComponentSelectBreed } from "../../component";
import { PetKind } from "../../types/pet-kind.types";

// @TODO: Handle failed initial data to update!

interface Props {
  petId?: string;
}

const Form: React.FunctionComponent<Props> = ({ petId }) => {
  const intl = useIntl();
  const { put: updatePut, status: updateStatus, response: updateResponse, error: updateError } = usePutPetsById(petId!);
  const { post: addPost, status: addStatus, response: addResponse, error: addError } = usePostPetsNew();
  const { response: petResponse, error: petError, status: petStatus, get: petGet } = useGetPetsById(petId || "", false);

  const status = petId ? updateStatus : addStatus;
  const response = petId ? updateResponse : addResponse;
  const error = petId ? updateError : addError;

  const [name, setName] = useState("");
  const [breedId, setBreedId] = useState<number | undefined>(undefined);
  const [microchip, setMicrochip] = useState("");
  const [birthDate, setBirthDate] = useState<string | undefined>(undefined);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [formEnable, setFormEnable] = useState(true);

  useEffect(() => {
    petGet();
  }, [petId]);

  useEffect(() => {
    setName(petResponse?.name || "");
    setBreedId(petResponse?.breed?.id || undefined);
    setMicrochip(petResponse?.microchip || "");
    setBirthDate(petResponse ? toDate(petResponse.birthDate) : undefined);
  }, [petResponse]);

  const formValidator = useFormValidator([
    { name: "name", value: name, validator: [FormValidators.Required] },
    {
      name: "breedId",
      value: String(breedId),
      validator: [],
    },
    {
      name: "microchip",
      value: microchip,
      validator: [],
    },
    {
      name: "birthDate",
      value: birthDate,
      validator: [FormValidators.Required],
    },
  ]);

  useEffect(() => {
    switch (status) {
      case ApiStatesTypes.Success:
        setSubmitEnable(!!petId);
        return;
      case ApiStatesTypes.Loading:
        setSubmitEnable(false);
        return;
    }

    setSubmitEnable(formValidator.formValid);
  }, [formValidator.formValid, status]);

  useEffect(() => {
    switch (status) {
      case ApiStatesTypes.Loading:
        setFormEnable(false);
        break;
      case ApiStatesTypes.Success:
        setFormEnable(!!petId);
        break;
      default:
        setFormEnable(true);
    }
  }, [status]);

  const handleSubmit = () => {
    if (petId) {
      void updatePut({
        name,
        breed: breedId,
        microchip,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      });

      return;
    }

    void addPost({
      name,
      breed: breedId,
      microchip,
      birthDate: new Date(birthDate!),
      kind: PetKind.Dog,
    });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      {(petStatus === ApiStatesTypes.Loading || status === ApiStatesTypes.Loading) && (
        <DoggoLoader fullScreen="component" />
      )}
      <DoggoFormControl label={intl.formatMessage({ id: "pet.name" })} errors={formValidator.errors["name"]}>
        <DoggoInputText value={name} onChange={setName} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "pet.breed" })} errors={formValidator.errors["breedId"]}>
        <ComponentSelectBreed value={breedId} onChange={setBreedId} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "pet.microchip" })} errors={formValidator.errors["microchip"]}>
        <DoggoInputText value={microchip} onChange={setMicrochip} disabled={!formEnable} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "pet.microchip" })} errors={formValidator.errors["birthDate"]}>
        <DoggoInputDate value={birthDate} onChange={setBirthDate} disabled={!formEnable} max={toDate(new Date())} />
      </DoggoFormControl>
      <DoggoBox column>
        <DoggoBox
          width={BoxWidth.Full}
          alignX={FlexAlign.Right}
          alignY={FlexAlign.Center}
          padding={{ bottom: SizesEnum.Large }}
        >
          <DoggoButton variant="blue" type="submit" disabled={!submitEnable}>
            <FormattedMessage id={`common.${petId ? "save" : "add"}`} />
          </DoggoButton>
        </DoggoBox>
        {response && (
          <DoggoBox column>
            <DoggoText color="green">
              <FormattedMessage id={`form.pet.${petId ? "updated" : "created"}`} />
            </DoggoText>
          </DoggoBox>
        )}
        {error && (
          <DoggoBox>
            <DoggoText color="red">{error.message}</DoggoText>
          </DoggoBox>
        )}
      </DoggoBox>
    </DoggoForm>
  );
};

export default Form;
