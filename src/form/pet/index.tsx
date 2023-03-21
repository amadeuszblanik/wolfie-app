import { BmeBox, BmeButton, BmeInputDate, BmeInputDeprecated, BmeSelectDeprecated, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { SelectItem } from "bme-ui/dist/atoms/select-deperacated/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormDeprecated, Loader, RemoveEntryModal } from "../../components";
import {
  petsActions,
  selectPets,
  selectPetsAddError,
  selectPetsAddStatus,
  selectPetsDeleteData,
  selectPetsDeleteError,
  selectPetsDeleteStatus,
  selectPetsEditError,
  selectPetsEditStatus,
  selectPetsMyStatus,
} from "../../store/pets.slice";
import { PetKind } from "../../types/pet-kind.type";
import { breedsActions, selectBreedsData } from "../../store/breeds.slice";
import { toInputDate } from "../../utils";

// @TODO Fix empty value on dropdown - bme-ui
// @TODO Add autocomplete - bme-ui

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsAddStatus = useAppSelector(selectPetsAddStatus);
  const storePetsAddError = useAppSelector(selectPetsAddError);
  const storePetsEditStatus = useAppSelector(selectPetsEditStatus);
  const storePetsEditError = useAppSelector(selectPetsEditError);
  const storePetsDeleteStatus = useAppSelector(selectPetsDeleteStatus);
  const storePetsDeleteError = useAppSelector(selectPetsDeleteError);
  const storePetsDeleteData = useAppSelector(selectPetsDeleteData);
  const storePets = useAppSelector(selectPets(petId || ""));
  const storeBreedsData = useAppSelector(selectBreedsData);

  const status = petId ? storePetsEditStatus : storePetsAddStatus;
  const error = petId ? storePetsEditError : storePetsAddError;

  const isLoadingPets = storePetsMyStatus === "pending" && status !== "success";

  const isError = status === "error";

  const breedsList: SelectItem[] = (storeBreedsData || []).map((breed) => ({
    key: String(breed.id),
    label: intl.formatMessage({ id: `breed.${breed.name}` }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [name, setName] = useState("");
  const kind = PetKind.Dog;
  const [breed, setBreed] = useState<SelectItem | null>(null);
  const [microchip, setMicrochip] = useState("");
  const [birthDate, setBirthDate] = useState<string>(toInputDate());

  const [entryToRemove, setEntryToRemove] = useState<string | null>(null);

  useEffect(() => {
    dispatch(petsActions.resetAdd());
    dispatch(petsActions.resetEdit());
    dispatch(breedsActions.get());
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (storePets === undefined && petId) {
      dispatch(petsActions.petsMy());
    }
  }, [storePets, petId, dispatch]);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (status === "success") {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [error, status]);

  useEffect(() => {
    if (storePets) {
      setName(storePets.name);
      setBreed({
        key: String(storePets.breed?.id),
        label: intl.formatMessage({ id: `breed.${storePets.breed?.name}` }),
      });
      setMicrochip(storePets.microchip);
      setBirthDate(toInputDate(new Date(storePets.birthDate)));
    }
  }, [storePets, intl]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name,
      kind,
      breed: Number(breed?.key),
      microchip,
      birthDate: new Date(birthDate),
    };

    if (petId) {
      dispatch(
        petsActions.edit({
          petId,
          payload,
        }),
      );

      return;
    }

    dispatch(petsActions.add(payload));
  };

  const handleOpenRemoveEntryModal = (entryId: string | null) => {
    setEntryToRemove(entryId);
    dispatch(petsActions.resetDelete());
  };

  const handleRemoveEntry = () => {
    if (!entryToRemove) {
      return;
    }

    dispatch(petsActions.remove({ petId: entryToRemove }));
  };

  return (
    <>
      <FormDeprecated
        onSubmit={handleSubmit}
        apiStatus={status}
        modalBorder={modelBorderColor}
        modal={
          isModalOpen ? (
            <BmeText align="center">
              {isError
                ? error ||
                  intl.formatMessage({ id: petId ? "common.form.pet_update.error" : "common.form.pet_add.error" })
                : intl.formatMessage({ id: petId ? "common.form.pet_update.success" : "common.form.pet_add.success" })}
            </BmeText>
          ) : undefined
        }
        onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
      >
        <>
          <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
            <BmeBox width="100%" margin="no|no|sm">
              <BmeInputDeprecated
                name="name"
                value={name}
                label={intl.formatMessage({ id: "common.form.name.label" })}
                onValue={setName}
                width="100%"
              />
            </BmeBox>
            <BmeBox width="100%" margin="no|no|sm">
              <BmeSelectDeprecated
                name="breed"
                label={intl.formatMessage({ id: "common.form.breed.label" })}
                list={breedsList}
                value={breed}
                onValue={setBreed}
                width="100%"
                emptyLabel={intl.formatMessage({ id: "breed.mixed" })}
                searchable
              />
            </BmeBox>
            <BmeBox width="100%" margin="no|no|sm">
              <BmeInputDeprecated
                name="microchip"
                value={microchip}
                label={intl.formatMessage({ id: "common.form.microchip.label" })}
                onValue={setMicrochip}
                width="100%"
              />
            </BmeBox>
            <BmeBox width="100%" margin="no|no|sm">
              <BmeInputDate
                name="microchip"
                value={birthDate}
                label={intl.formatMessage({ id: "common.form.birth_date.label" })}
                onValue={setBirthDate}
                width="100%"
                type="date"
              />
            </BmeBox>
            <BmeBox margin="no|no|lg">
              <BmeBox margin="no|xs">
                <BmeButton type="submit">
                  <FormattedMessage id={petId ? "common.form.update.label" : "common.form.add.label"} />
                </BmeButton>
              </BmeBox>
              {petId && (
                <BmeBox margin="no|xs">
                  <BmeButton type="button" variant="red" onClick={() => handleOpenRemoveEntryModal(petId)}>
                    <FormattedMessage id="common.form.delete.label" />
                  </BmeButton>
                </BmeBox>
              )}
            </BmeBox>
          </BmeBox>
          {isLoadingPets && <Loader />}
        </>
      </FormDeprecated>
      {entryToRemove && (
        <RemoveEntryModal
          apiStatus={storePetsDeleteStatus}
          error={storePetsDeleteError}
          success={storePetsDeleteData}
          onCancel={() => handleOpenRemoveEntryModal(null)}
          onRemove={handleRemoveEntry}
          onSuccess={() => router.push("/app")}
        />
      )}
    </>
  );
};

export default Component;
