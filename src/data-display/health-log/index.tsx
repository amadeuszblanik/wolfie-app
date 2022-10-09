import React from "react";
import { DoggoBox, DoggoList } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentApiWrapper } from "../../component";
import { CommonErrorResponseModel } from "../../api/response-model/common-error.response-model";
import { ApiStatesTypes } from "../../types/api-states.types";

interface Props {
  status: ApiStatesTypes;
  error: CommonErrorResponseModel | undefined;
  items: string[][];
}

const DataDisplay: React.FunctionComponent<Props> = ({ items, error, status }) => {
  return (
    <ComponentApiWrapper error={error} status={status}>
      <DoggoBox padding={{ top: SizesEnum.Large }}>
        <DoggoList label="All data" items={items} />
      </DoggoBox>
    </ComponentApiWrapper>
  );
};

export default DataDisplay;
