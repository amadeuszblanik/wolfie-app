import React from "react";
import { DoggoListDeprecated } from "../../ui-components";
import { ComponentApiWrapper } from "../../component";
import { ListItem } from "../../ui-components/list-deprecated";
import useAuthorizedDevices from "../../api/queries/authorized-devices";
import { pipeDate } from "../../pipe";

const DataDisplay: React.FunctionComponent = () => {
  const { status, error, response } = useAuthorizedDevices();

  const items: ListItem[][] = response?.map((value) => [value.device, pipeDate(value.expiration)]) || [];

  return (
    <ComponentApiWrapper error={error} status={status}>
      <DoggoListDeprecated items={items} />
    </ComponentApiWrapper>
  );
};

export default DataDisplay;
