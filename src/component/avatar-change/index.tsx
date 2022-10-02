import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { DoggoAvatarCrop, DoggoBox, DoggoButton, DoggoInputFile, DoggoModal } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { FlexAlign } from "../../ui-components/box";
import { useBase64ToFile, useFileToBase64 } from "../../hooks";
import { firstElement, isEmpty } from "bme-utils";
import usePetsAvatarChange from "../../api/queries/pets-avatar-change";
import { ApiStatesTypes } from "../../types/api-states.types";
import { ComponentApiWrapper } from "../index";

interface Props {
  onClose: () => void;
  onSave: () => void;
  petId: string;
}

const Component: React.FunctionComponent<Props> = ({ onClose, onSave, petId }) => {
  const { results: fileListBase64, setFileList } = useFileToBase64();
  const { result, setDataUrl, setFileName } = useBase64ToFile();
  const [croppedImage, setCroppedImage] = useState<string>();
  const imageToCrop = firstElement(fileListBase64);

  const {
    status: petsAvatarChangeStatus,
    error: petsAvatarChangeError,
    mutate: petsAvatarChangeMutate,
  } = usePetsAvatarChange();

  const handleChangeFile = (nextValue: FileList | null) => {
    const fileName = nextValue && firstElement(Array.from(nextValue))?.name;
    if (fileName) {
      setFileName(fileName);
    }
    setFileList(nextValue);
  };

  const handleCrop = (nextValue: string) => {
    setCroppedImage(nextValue);
  };

  const handleSave = () => {
    if (!croppedImage) {
      return;
    }

    setDataUrl(croppedImage);
  };

  const submitForm = () => {
    if (!result) {
      return;
    }

    petsAvatarChangeMutate({ id: petId, body: { description: "Avatar", file: result } });
  };

  useEffect(() => {
    if (!result) {
      return;
    }

    submitForm();
  }, [result, submitForm]);

  useEffect(() => {
    switch (petsAvatarChangeStatus) {
      case ApiStatesTypes.Success:
        onSave();
    }
  }, [petsAvatarChangeStatus, onSave]);

  return (
    <DoggoModal onClose={onClose}>
      <ComponentApiWrapper error={petsAvatarChangeError} status={petsAvatarChangeStatus} onTryAgain={submitForm}>
        <DoggoBox alignX={FlexAlign.Center} column>
          <DoggoInputFile
            onChange={handleChangeFile}
            accept={["image/png", "image/jpg", "image/jpeg"]}
          ></DoggoInputFile>
          {imageToCrop && (
            <DoggoBox padding={{ bottom: SizesEnum.Medium }}>
              <DoggoAvatarCrop width={512} height={512} componentWidth={300} src={imageToCrop} onCrop={handleCrop} />
            </DoggoBox>
          )}
          <DoggoButton variant="green" onClick={handleSave} disabled={isEmpty(imageToCrop)}>
            <FormattedMessage id="common.save" />
          </DoggoButton>
        </DoggoBox>
      </ComponentApiWrapper>
    </DoggoModal>
  );
};
export default Component;
