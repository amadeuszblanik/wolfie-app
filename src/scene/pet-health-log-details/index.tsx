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
  selectPetsHealthLogDataById,
  selectPetsHealthLogError,
  selectPetsHealthLogStatus,
} from "../../store/petsHealthLog.slice";
import { pipeDate } from "../../pipes";

// @TODO Add 404 view

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
  const healthLogId = String(router.query.healthLogId);

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsSingle = useAppSelector(selectPets(petId));
  const storePetsHealthLogStatus = useAppSelector(selectPetsHealthLogStatus);
  const storePetsHealthLogError = useAppSelector(selectPetsHealthLogError);
  const storePetsHealthLogData = useAppSelector(selectPetsHealthLogDataById(healthLogId));

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

  const medicinesList = [
    ...(storePetsHealthLogData?.medicines || []).map((medicine) => medicine.name),
    ...(storePetsHealthLogData?.additionalMedicines || []),
  ];

  return (
    <StyledSceneWrapper>
      {storePetsSingle && <PetCard {...storePetsSingle} />}
      <BmeList>
        <BmeList.Item>
          <BmeText>
            <FormattedMessage id="scene.health_log_details.kind" />
          </BmeText>
          <BmeText>
            <FormattedMessage id={`common.health_log.kind.${storePetsHealthLogData?.kind.toLowerCase()}`} />
          </BmeText>
        </BmeList.Item>
        {storePetsHealthLogData?.date && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.date" />
            </BmeText>
            <BmeText>{pipeDate(storePetsHealthLogData.date)}</BmeText>
          </BmeList.Item>
        )}
        {medicinesList && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.medicines" />
            </BmeText>
            <BmeText>{medicinesList.join(", ")}</BmeText>
          </BmeList.Item>
        )}
        {storePetsHealthLogData?.veterinary && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.veterinary" />
            </BmeText>
            <BmeText>{storePetsHealthLogData.veterinary}</BmeText>
          </BmeList.Item>
        )}
        {storePetsHealthLogData?.diagnosis && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.diagnosis" />
            </BmeText>
            <BmeText>{storePetsHealthLogData.diagnosis}</BmeText>
          </BmeList.Item>
        )}
        {storePetsHealthLogData?.nextVisit && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.next_visit" />
            </BmeText>
            <BmeText>{pipeDate(storePetsHealthLogData.nextVisit)}</BmeText>
          </BmeList.Item>
        )}
        {storePetsHealthLogData?.description && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.description" />
            </BmeText>
            <BmeText>{storePetsHealthLogData.description}</BmeText>
          </BmeList.Item>
        )}
        {storePetsHealthLogData?.addedBy && (
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="scene.health_log_details.added_by" />
            </BmeText>
            <BmeText>{storePetsHealthLogData.addedBy.fullName}</BmeText>
          </BmeList.Item>
        )}
      </BmeList>
      {isAnyPending && <Loader />}
    </StyledSceneWrapper>
  );
};

export default Scene;