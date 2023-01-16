import { useCallback, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BmeButton, BmeLineChart, BmeList, BmeText } from "bme-ui";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPets, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import { ErrorMessage, Loader, PetCard } from "../../components";
import {
  petsWeightActions,
  selectPetsWeightData,
  selectPetsWeightError,
  selectPetsWeightStatus,
} from "../../store/petsWeight.slice";
import { pipeDate } from "../../pipes";
import { selectProfileData } from "../../store/profile.slice";
import { Link } from "../../atoms";

const ENTRIES_TO_DISPLAY_CHART = 3;
const ENTRIES_TO_DISPLAY_LIST = 1;

// @TODO: Fix chart X labels - bme-ui
// @TODO: Refactor line chart - bme-ui
// @TODO: Refactor list - bme-ui
// @TODO: Move add entry button to some other place - temporary solution
// @TODO: Fix list actions link - bme-ui

const StyledSceneWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    grid-gap: 24px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Scene = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const petId = String(router.query.petId);

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsSingle = useAppSelector(selectPets(petId));
  const storePetsWeightStatus = useAppSelector(selectPetsWeightStatus);
  const storePetsWeightError = useAppSelector(selectPetsWeightError);
  const storePetsWeightData = useAppSelector(selectPetsWeightData);
  const storeProfileData = useAppSelector(selectProfileData);

  const isAnyPending = [storePetsMyStatus, storePetsWeightStatus].some((status) => status === "pending");
  const isAnyError = [storePetsMyStatus, storePetsWeightStatus].some((status) => status === "error");
  const errorMessages = [storePetsMyError, storePetsWeightError].filter(Boolean) as string[];

  const handleUpdatePets = useCallback(() => {
    if (!storePetsSingle) {
      dispatch(petsActions.petsMy());
    }
  }, [dispatch, storePetsSingle]);

  const handleUpdatePetsWeight = useCallback(() => {
    dispatch(petsWeightActions.get({ petId }));
  }, [dispatch, petId]);

  const handleTryAgain = () => {
    handleUpdatePets();
    handleUpdatePetsWeight();
  };

  useEffect(() => {
    if (petId) {
      handleUpdatePetsWeight();
    }
  }, [petId, handleUpdatePetsWeight]);

  useEffect(() => {
    handleUpdatePets();
  }, [dispatch, handleUpdatePets]);

  if (isAnyError) {
    return (
      <ErrorMessage
        messages={errorMessages || [intl.formatMessage({ id: "error.generic_fetch" })]}
        onTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <StyledSceneWrapper>
      {storePetsSingle && <PetCard {...storePetsSingle} />}
      {storePetsWeightData && storePetsWeightData.length >= ENTRIES_TO_DISPLAY_CHART && (
        <BmeLineChart
          data={storePetsWeightData.map(({ raw, date }) => ({
            y: raw,
            x: new Date(date),
          }))}
        />
      )}
      {storePetsWeightData && storePetsWeightData.length >= ENTRIES_TO_DISPLAY_LIST ? (
        <>
          <Link href={`/app/pet/${petId}/weight/add`}>
            <BmeButton width="100%">
              <FormattedMessage id="page.pet_weight.add_entry" />
            </BmeButton>
          </Link>
          <BmeList label={storeProfileData?.weightUnit}>
            {storePetsWeightData?.map((item) => (
              <BmeList.Item
                key={item.id}
                actions={
                  <Link href={`/app/pet/${petId}/weight/${item.id}`}>
                    <BmeButton variant="blue">
                      <FormattedMessage id="page.pet_weight.edit_entry" />
                    </BmeButton>
                  </Link>
                }
              >
                <BmeText>{item.formatted}</BmeText>
                <BmeText>{pipeDate(item.date)}</BmeText>
              </BmeList.Item>
            ))}
          </BmeList>
        </>
      ) : (
        <Link href={`/app/pet/${petId}/weight/add`}>
          <BmeButton width="100%">
            <FormattedMessage id="page.pet_weight.no_entries" />
          </BmeButton>
        </Link>
      )}
      {isAnyPending && <Loader />}
    </StyledSceneWrapper>
  );
};

export default Scene;
