import React from "react";
import { DoggoBox, DoggoLoader } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentApiWrapper } from "../../component";
import useProfile from "../../api/queries/profile";
import { FormProfile } from "../../form";

const DataDisplay: React.FunctionComponent = () => {
  const { status, error, response } = useProfile();

  return (
    <ComponentApiWrapper error={error} status={status}>
      <DoggoBox padding={{ top: SizesEnum.Large }}>
        {response && <FormProfile initialValues={response} />}
        {!response && <DoggoLoader />}
      </DoggoBox>
    </ComponentApiWrapper>
  );
};

export default DataDisplay;
