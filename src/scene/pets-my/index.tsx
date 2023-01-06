import { BmeBox } from "bme-ui";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector, useMobile } from "../../hooks";
import { petsActions, selectPetsMy, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import { ErrorMessage, Loader, PetCard } from "../../components";

const Scene = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const isMobile = useMobile();

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsMy = useAppSelector(selectPetsMy);

  useEffect(() => {
    dispatch(petsActions.petsMy());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(petsActions.petsMy());
  };

  return (
    <>
      <BmeBox wrap width="100%" minHeight="100%">
        {storePetsMy?.map((petProps) => (
          <BmeBox key={petProps.id} width={isMobile ? "100%" : "50%"} padding={isMobile ? "xs|no" : "xs"}>
            <PetCard {...petProps} />
          </BmeBox>
        ))}
      </BmeBox>
      {storePetsMyStatus === "pending" && <Loader />}
      {storePetsMyStatus === "error" && (
        <ErrorMessage
          messages={[storePetsMyError || intl.formatMessage({ id: "error.generic_fetch" })]}
          onTryAgain={handleTryAgain}
        />
      )}
    </>
  );
};

export default Scene;
