import { useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BmeButton, BmeList, BmeText } from "bme-ui";
import { isEmpty } from "bme-utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPets, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import { ErrorMessage, Loader, PetCard, RemoveEntryModal } from "../../components";
import {
  petsHealthLogActions,
  selectPetsHealthLogData,
  selectPetsHealthLogDeleteData,
  selectPetsHealthLogDeleteError,
  selectPetsHealthLogDeleteStatus,
  selectPetsHealthLogError,
  selectPetsHealthLogStatus,
} from "../../store/petsHealthLog.slice";
import { pipeDate } from "../../pipes";
import { Link } from "../../atoms";

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
  const storePetsHealthLogDeleteStatus = useAppSelector(selectPetsHealthLogDeleteStatus);
  const storePetsHealthLogDeleteError = useAppSelector(selectPetsHealthLogDeleteError);
  const storePetsHealthLogDeleteData = useAppSelector(selectPetsHealthLogDeleteData);

  const isAnyPending = [storePetsMyStatus, storePetsHealthLogStatus].some((status) => status === "pending");
  const isAnyError = [storePetsMyStatus, storePetsHealthLogStatus].some((status) => status === "error");
  const errorMessages = [storePetsMyError, storePetsHealthLogError].filter(Boolean) as string[];

  const [entryToRemove, setEntryToRemove] = useState<string | null>(null);

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

  const handleOpenRemoveEntryModal = (entryId: string | null) => {
    setEntryToRemove(entryId);
    dispatch(petsHealthLogActions.resetDelete());
  };

  const handleRemoveEntry = () => {
    if (!entryToRemove) {
      return;
    }

    dispatch(petsHealthLogActions.remove({ petId, healthLogId: entryToRemove }));
    dispatch(petsHealthLogActions.get({ petId }));
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
      {!isEmpty(storePetsHealthLogData) ? (
        <>
          <Link href={`/app/pet/${petId}/health-log/add`}>
            <BmeButton width="100%">
              <FormattedMessage id="page.pet_health_log.add_entry" />
            </BmeButton>
          </Link>
          <BmeList>
            {storePetsHealthLogData?.map((item) => (
              <BmeList.Item
                key={item.id}
                onClick={() => router.push(`/app/pet/${petId}/health-log/${item.id}`)}
                actions={[
                  {
                    variant: "blue",
                    onClick: () => router.push(`/app/pet/${petId}/health-log/${item.id}/edit`),
                    children: intl.formatMessage({ id: "page.pet_weight.edit_entry" }),
                  },
                  {
                    variant: "red",
                    onClick: () => handleOpenRemoveEntryModal(item.id),
                    children: intl.formatMessage({ id: "page.pet_weight.delete_entry" }),
                  },
                ]}
              >
                <BmeText>
                  <FormattedMessage id={`common.health_log.kind.${item.kind.toLowerCase()}`} />
                </BmeText>
                <BmeText>{pipeDate(item.date)}</BmeText>
              </BmeList.Item>
            ))}
          </BmeList>
        </>
      ) : (
        <Link href={`/app/pet/${petId}/health-log/add`}>
          <BmeButton width="100%">
            <FormattedMessage id="page.pet_health_log.no_entries" />
          </BmeButton>
        </Link>
      )}
      {entryToRemove && (
        <RemoveEntryModal
          apiStatus={storePetsHealthLogDeleteStatus}
          error={storePetsHealthLogDeleteError}
          success={storePetsHealthLogDeleteData}
          onCancel={() => handleOpenRemoveEntryModal(null)}
          onRemove={handleRemoveEntry}
        />
      )}
      {isAnyPending && <Loader />}
    </StyledSceneWrapper>
  );
};

export default Scene;
