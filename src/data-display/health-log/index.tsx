import React from "react";
import useHealthLogPet from "../../api/queries/health-log-pet";
import { DoggoBox, DoggoList } from "../../ui-components";
import { pipeDate } from "../../pipe";
import { SizesEnum } from "../../settings/sizes";
import { ComponentApiWrapper } from "../../component";

interface Props {
  petId: string;
}

const DataDisplay: React.FunctionComponent<Props> = ({ petId }) => {
  const { response, error, status } = useHealthLogPet(petId);

  const items = response?.map(({ kind, date }) => [String(kind), pipeDate(date)]) || [];

  return (
    <ComponentApiWrapper error={error} status={status}>
      <DoggoBox padding={{ top: SizesEnum.Large }}>
        <DoggoList label="All data" items={items} />
      </DoggoBox>
    </ComponentApiWrapper>
  );
};

export default DataDisplay;
