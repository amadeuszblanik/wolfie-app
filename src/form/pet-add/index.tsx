import { BmeBox, BmeButton, BmeDropdown, BmeInput, BmeInputDate, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useLayoutEffect, useState } from "react";
import { DropdownItem } from "bme-ui/dist/cjs/types/atoms/dropdown/types";
import { DefaultTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import { petsActions, selectPetsAddError, selectPetsAddStatus } from "../../store/pets.slice";
import { PetKind } from "../../types/pet-kind.type";
import { breedsActions, selectBreedsData } from "../../store/breeds.slice";
import { toInputDate } from "../../utils";

// @TODO Fix empty value on dropdown - bme-ui
// @TODO Add autocomplete - bme-ui

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storePetsAddStatus = useAppSelector(selectPetsAddStatus);
  const storePetsAddError = useAppSelector(selectPetsAddError);
  const storeBreedsData = useAppSelector(selectBreedsData);

  const isError = storePetsAddStatus === "error";

  const breedsList: DropdownItem[] = (storeBreedsData || []).map((breed) => ({
    key: String(breed.id),
    label: intl.formatMessage({ id: `breed.${breed.name}` }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [name, setName] = useState("");
  const kind = PetKind.Dog;
  const [breed, setBreed] = useState<DropdownItem | null>(null);
  const [microchip, setMicrochip] = useState("");
  const [birthDate, setBirthDate] = useState<string>(toInputDate());

  useEffect(() => {
    dispatch(petsActions.resetAdd());
    dispatch(breedsActions.get());
    setIsModalOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (storePetsAddError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (storePetsAddStatus === "success") {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [storePetsAddError, storePetsAddStatus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      petsActions.add({
        name,
        kind,
        breed: Number(breed?.key),
        microchip,
        birthDate: new Date(birthDate),
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storePetsAddStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? storePetsAddError || intl.formatMessage({ id: "common.form.profile.error" })
              : intl.formatMessage({ id: "common.form.profile.success" })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="name"
            value={name}
            label={intl.formatMessage({ id: "common.form.name.label" })}
            onValue={setName}
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeDropdown
            name="breed"
            label={intl.formatMessage({ id: "common.form.breed.label" })}
            list={breedsList}
            value={breed}
            onValue={setBreed}
            width="100%"
            emptyLabel={intl.formatMessage({ id: "breed.mixed" })}
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
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
          <BmeButton type="submit">
            <FormattedMessage id="common.form.submit.label" />
          </BmeButton>
        </BmeBox>
      </BmeBox>
    </Form>
  );
};

export default Component;
