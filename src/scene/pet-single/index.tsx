import { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPets, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import { BigFancyBox, ErrorMessage, Loader, PetCard } from "../../components";

const StyledSceneWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    grid-gap: 24px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledScenePromo = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;

const Scene = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const id = String(router.query.id);

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsSingle = useAppSelector(selectPets(id));

  const handleUpdatePets = useCallback(() => {
    if (!storePetsSingle) {
      dispatch(petsActions.petsMy());
    }
  }, [dispatch, storePetsSingle]);

  useEffect(() => {
    handleUpdatePets();
  }, [handleUpdatePets]);

  if (storePetsMyStatus === "error") {
    return (
      <ErrorMessage
        messages={[storePetsMyError || intl.formatMessage({ id: "error.generic_fetch" })]}
        onTryAgain={handleUpdatePets}
      />
    );
  }

  return (
    <StyledSceneWrapper>
      <StyledScenePromo>{storePetsSingle && <PetCard {...storePetsSingle} />}</StyledScenePromo>
      <Link href={`/app/pet/${id}/weight`}>
        <BigFancyBox
          icon="barbell"
          title="Weight"
          value={storePetsSingle?.currentWeight?.formatted ?? "—"}
          variant="blue"
        />
      </Link>
      <Link href={`/app/pet/${id}/health-log`}>
        <BigFancyBox icon="heart" title="Health log" value={String(storePetsSingle?.healthLog ?? "—")} variant="red" />
      </Link>
      {storePetsMyStatus === "pending" && <Loader />}
    </StyledSceneWrapper>
  );
};

export default Scene;
