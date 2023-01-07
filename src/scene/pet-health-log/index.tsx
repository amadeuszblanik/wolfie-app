import { useCallback, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BmeList, BmeText } from "bme-ui";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPets, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import { ErrorMessage, Loader, PetCard } from "../../components";
import {
  petsHealthLogActions,
  selectPetsHealthLogData,
  selectPetsHealthLogError,
  selectPetsHealthLogStatus,
} from "../../store/petsHealthLog.slice";
import { pipeDate } from "../../pipes";

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
  const storePetsHealthLogStatus = useAppSelector(selectPetsHealthLogStatus);
  const storePetsHealthLogError = useAppSelector(selectPetsHealthLogError);
  const storePetsHealthLogData = useAppSelector(selectPetsHealthLogData);

  const isAnyPending = [storePetsMyStatus, storePetsHealthLogStatus].some((status) => status === "pending");
  const isAnyError = [storePetsMyStatus, storePetsHealthLogStatus].some((status) => status === "error");
  const errorMessages = [storePetsMyError, storePetsHealthLogError].filter(Boolean) as string[];

  const handleUpdatePets = useCallback(() => {
    if (!storePetsSingle) {
      dispatch(petsActions.petsMy());
    }
  }, [dispatch, storePetsSingle]);

  const handleUpdatePetsHealthLog = useCallback(() => {
    dispatch(petsHealthLogActions.get({ petId }));
  }, [dispatch, petId]);

  const handleTryAgain = () => {
    handleUpdatePets();
    handleUpdatePetsHealthLog();
  };

  useEffect(() => {
    if (petId) {
      handleUpdatePetsHealthLog();
    }
  }, [petId]);

  useEffect(() => {
    handleUpdatePets();
  }, [dispatch]);

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
      <BmeList>
        {storePetsHealthLogData?.map((item) => (
          <BmeList.Item key={item.id} onClick={() => void router.push(`/app/pet/${petId}/health-log/${item.id}`)}>
            <BmeText>
              <FormattedMessage id={`common.health_log.kind.${item.kind.toLowerCase()}`} />
            </BmeText>
            <BmeText>{pipeDate(item.date)}</BmeText>
          </BmeList.Item>
        ))}
      </BmeList>
      {isAnyPending && <Loader />}
    </StyledSceneWrapper>
  );
};

export default Scene;