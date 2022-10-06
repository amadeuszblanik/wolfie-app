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
  const [uploadedImage, setUploadedImage] = useState<FileList | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>();

  const [imageToCrop] = useFileToBase64(uploadedImage);
  const [imageToUpload] = useBase64ToFile(imageToCrop ? [imageToCrop] : []);

  const {
    status: petsAvatarChangeStatus,
    error: petsAvatarChangeError,
    mutate: petsAvatarChangeMutate,
  } = usePetsAvatarChange();

  const handleChangeFile = (nextValue: FileList | null) => {
    setUploadedImage(nextValue);
  };

  const handleCrop = (nextValue: string) => {
    setCroppedImage(nextValue);
  };

  const handleSave = () => {
    if (!imageToUpload) {
      return;
    }

    petsAvatarChangeMutate({
      id: petId,
      body: {
        file: imageToUpload,
        description: "Avatar",
      },
    });
  };

  useEffect(() => {
    switch (petsAvatarChangeStatus) {
      case ApiStatesTypes.Success:
        onSave();
    }
  }, [petsAvatarChangeStatus]);

  return (
    <DoggoModal onClose={onClose}>
      <ComponentApiWrapper error={petsAvatarChangeError} status={petsAvatarChangeStatus} onTryAgain={handleSave}>
        <DoggoBox alignX={FlexAlign.Center} column>
          {imageToCrop && (
            <DoggoBox padding={{ bottom: SizesEnum.Large }}>
              <DoggoAvatarCrop
                width={512}
                height={512}
                componentWidth={300}
                src={imageToCrop.uri}
                onCrop={handleCrop}
              />
            </DoggoBox>
          )}
          <DoggoInputFile
            onChange={handleChangeFile}
            accept={["image/png", "image/jpg", "image/jpeg"]}
          ></DoggoInputFile>
          <DoggoButton variant="green" onClick={handleSave} disabled={!imageToUpload}>
            <FormattedMessage id="common.save" />
          </DoggoButton>
        </DoggoBox>
      </ComponentApiWrapper>
    </DoggoModal>
  );
};
export default Component;
