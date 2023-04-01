import { BmeBox, BmeButton, BmeInput, BmeModal, BmeProgressBar, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  petsActions,
  selectPets,
  selectPetsDeleteData,
  selectPetsDeleteError,
  selectPetsDeleteStatus,
} from "../../store/pets.slice";
import { StyledFormWrapper } from "../../components/form";

// @TODO: Fix BmeModal - Close button is not working properly.

const Component = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;

  const storePets = useAppSelector(selectPets(petId || ""));
  const storeStatus = useAppSelector(selectPetsDeleteStatus);
  const storeError = useAppSelector(selectPetsDeleteError);
  const storeData = useAppSelector(selectPetsDeleteData);

  const isPending = storeStatus === "pending";
  const isSuccess = storeStatus === "success";
  const isError = storeStatus === "error";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [petName, setPetName] = useState("");

  useEffect(() => {
    dispatch(petsActions.resetDelete());
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    if (!storePets) {
      throw new Error("Pet not found during delete");
    }

    dispatch(petsActions.remove({ petId: storePets.id }));
  };

  const handleSuccess = () => {
    router.push("/app");
  };

  return (
    <StyledFormWrapper as="div">
      {isModalVisible && (
        <BmeModal>
          <BmeBox alignX="center" width="100%" padding="no|no|sm">
            <BmeText align="center">{isSuccess ? storeData : <FormattedMessage id="form.pet_delete.verify" />}</BmeText>
          </BmeBox>
          {!isSuccess && (
            <BmeBox width="100%" padding="no|no|sm">
              <BmeInput
                placeholder={storePets?.name}
                value={petName}
                onChange={(value) => setPetName(value)}
                disabled={isPending}
              />
            </BmeBox>
          )}
          {isPending && (
            <BmeBox width="100%" padding="no|no|xs">
              <BmeProgressBar />
            </BmeBox>
          )}
          {isError && (
            <BmeBox alignX="center" width="100%" padding="no|no|xs">
              <BmeText align="center" color="red">
                {storeError}
              </BmeText>
            </BmeBox>
          )}
          <BmeBox alignX="center" width="100%">
            {isSuccess ? (
              <BmeButton onClick={handleSuccess} width="100%">
                <FormattedMessage id="common.form.confirm.label" />
              </BmeButton>
            ) : (
              <>
                <BmeBox width="50%" padding="no|sm|no|no">
                  <BmeButton variant="red" onClick={handleConfirm} disabled={isPending || petName !== storePets?.name}>
                    <FormattedMessage id="common.form.delete.label" />
                  </BmeButton>
                </BmeBox>
                <BmeBox width="50%" padding="no|no|no|sm">
                  <BmeButton variant="green" onClick={handleCloseModal} disabled={isPending}>
                    <FormattedMessage id="common.form.cancel.label" />
                  </BmeButton>
                </BmeBox>
              </>
            )}
          </BmeBox>
        </BmeModal>
      )}
      <BmeButton variant="red" onClick={handleOpenModal}>
        <FormattedMessage id="common.form.delete.label" />
      </BmeButton>
    </StyledFormWrapper>
  );
};

export default Component;
