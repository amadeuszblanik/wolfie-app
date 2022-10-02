import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import usePetsAdd from "../../../../src/api/queries/pets-add";
import { PetKind } from "../../../../src/types/pet-kind.types";
import useConfigPublic from "../../../../src/api/queries/config-public";
import { ApiStatesTypes } from "../../../../src/types/api-states.types";
import { LayoutApp } from "../../../../src/layout";
import { ComponentApiWrapper, ComponentErrorScreen, ComponentPetCard } from "../../../../src/component";
import { DoggoBox, DoggoButton, DoggoInput, DoggoModal, DoggoSelect } from "../../../../src/ui-components";
import { SizesEnum } from "../../../../src/settings/sizes";
import { InputTypes } from "../../../../src/ui-components/input";
import { FlexAlign } from "../../../../src/ui-components/box";
import usePetsSingle from "../../../../src/api/queries/pets-single";
import { toDate } from "../../../../src/utils";
import usePetsEdit from "../../../../src/api/queries/pets-edit";

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id: petId } = router.query;

  const { pet, petError, status: petStatus, refetch } = usePetsSingle(petId as string);
  const {
    status: configPublicStatus,
    configPublic,
    configPublicError,
    refetch: refetchConfigPublic,
  } = useConfigPublic();
  const { status: petsAddStatus, error: petsAddError, mutate } = usePetsEdit();

  const [name, setName] = useState("");
  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [kind, setKind] = useState<PetKind>(PetKind.Dog);
  const [kindErrors, setKindErrors] = useState<string[]>([]);
  const [breedId, setBreedId] = useState<number>();
  const [breedIdErrors, setBreedIdErrors] = useState<string[]>([]);
  const [microchip, setMicrochip] = useState("");
  const [microchipErrors, setMicrochipErrors] = useState<string[]>([]);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateErrors, setBirthDateErrors] = useState<string[]>([]);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    setName(pet?.name ?? "");
    setKind(pet?.kind ?? PetKind.Dog);
    setBreedId(pet?.breed?.id);
    setMicrochip(pet?.microchip ?? "");
    setBirthDate(pet ? toDate(pet.birthDate || new Date()) : "");
  }, [pet]);

  useEffect(() => {
    switch (petsAddStatus) {
      case ApiStatesTypes.Success:
        router.push("/app");
        break;
      case ApiStatesTypes.Error:
        setErrorModal(true);
        break;
    }
  }, [petsAddStatus]);

  const handleTryAgain = () => {
    refetchConfigPublic();
  };

  const handleUpdatePet = () => {
    const isValid = name && kind && breedId && microchip && birthDate;

    if (!name) {
      setNameErrors([intl.formatMessage({ id: "error.required" })]);
    } else {
      setNameErrors([]);
    }

    if (!kind) {
      setKindErrors([intl.formatMessage({ id: "error.required" })]);
    } else {
      setKindErrors([]);
    }

    if (!breedId) {
      setBreedIdErrors([intl.formatMessage({ id: "error.required" })]);
    } else {
      setBreedIdErrors([]);
    }

    if (!microchip) {
      setMicrochipErrors([intl.formatMessage({ id: "error.required" })]);
    } else {
      setMicrochipErrors([]);
    }

    if (!birthDate) {
      setBirthDateErrors([intl.formatMessage({ id: "error.required" })]);
    } else {
      setBirthDateErrors([]);
    }

    if (!isValid) {
      return;
    }

    mutate({
      id: petId as string,
      body: {
        name,
        kind,
        breed: breedId,
        microchip,
        birthDate: new Date(birthDate),
      },
    });
  };

  return (
    <>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.app.header" })} back>
        <ComponentApiWrapper
          status={[configPublicStatus || petStatus]}
          error={configPublicError || petError}
          onTryAgain={handleTryAgain}
        >
          <DoggoBox padding={{ bottom: SizesEnum.ExtraLarge }}>
            <ComponentPetCard name={name} birthDate={new Date(birthDate)} microchip={microchip} image={pet?.image} />
          </DoggoBox>
          <DoggoInput
            value={name}
            onChange={setName}
            label={intl.formatMessage({ id: "pet.name" })}
            errors={nameErrors}
          />
          <DoggoSelect
            value={breedId}
            onChange={(nextValue) => setBreedId(Number(nextValue))}
            label={intl.formatMessage({ id: "pet.breed" })}
            list={configPublic?.breeds.map(({ name: label, id }) => ({ id, label })) || []}
            errors={breedIdErrors}
          />
          <DoggoInput
            value={microchip}
            onChange={setMicrochip}
            label={intl.formatMessage({ id: "pet.microchip" })}
            errors={microchipErrors}
          />
          <DoggoInput
            value={birthDate}
            onChange={setBirthDate}
            label={intl.formatMessage({ id: "pet.birthday" })}
            type={InputTypes.Date}
            errors={birthDateErrors}
            max={toDate(new Date())}
          />
          <DoggoBox alignX={FlexAlign.Right}>
            <DoggoButton onClick={handleUpdatePet} variant="green">
              <FormattedMessage id="common.save" />
            </DoggoButton>
          </DoggoBox>
          {errorModal && (
            <DoggoModal onClose={() => setErrorModal(false)}>
              <ComponentErrorScreen message={petsAddError?.message} onTryAgain={handleUpdatePet} />
            </DoggoModal>
          )}
        </ComponentApiWrapper>
      </LayoutApp>
    </>
  );
};

export default App;
