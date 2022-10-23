import React from "react";
import { DoggoBox, DoggoListDeprecated } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentApiWrapper } from "../../component";
import { CommonErrorResponseModel } from "../../api/response-model/common-error.response-model";
import { ApiStatesTypes } from "../../types/api-states.types";
import { ListItem } from "../../ui-components/list-deprecated";

interface Props {
  status: ApiStatesTypes;
  error: CommonErrorResponseModel | undefined;
  items: ListItem[];
}

const DataDisplay: React.FunctionComponent<Props> = ({ items, error, status }) => {
  return (
    <ComponentApiWrapper error={error} status={status}>
      <DoggoBox padding={{ top: SizesEnum.Large }}>
        <DoggoListDeprecated items={items} />
      </DoggoBox>
    </ComponentApiWrapper>
  );
};

export default DataDisplay;
