import { BmeBox } from "bme-ui";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPets, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import { ErrorMessage, Loader, PetCard } from "../../components";

const Scene = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const id = String(router.query.id);

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsSingle = useAppSelector(selectPets(id));

  const handleUpdatePets = () => {
    if (!storePetsSingle) {
      dispatch(petsActions.petsMy());
    }
  };

  useEffect(() => {
    handleUpdatePets();
  }, [handleUpdatePets]);

  return (
    <>
      <BmeBox wrap width="100%" minHeight="100%">
        {storePetsSingle && <PetCard {...storePetsSingle} />}
      </BmeBox>
      {storePetsMyStatus === "pending" && <Loader />}
      {storePetsMyStatus === "error" && (
        <ErrorMessage
          messages={[storePetsMyError || intl.formatMessage({ id: "error.generic_fetch" })]}
          onTryAgain={handleUpdatePets}
        />
      )}
    </>
  );
};

export default Scene;
