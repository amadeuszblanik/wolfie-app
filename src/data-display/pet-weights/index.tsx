import React, { useState } from "react";
import { ComponentErrorScreen } from "../../component";
import { useGetPetsWeightById } from "../../api/queries";
import { DoggoBox, DoggoLineChart, DoggoList, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { pipeDate } from "../../pipe";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import { BoxWidth } from "../../ui-components/box";

interface Props {
  petId: string;
}

const PLACEHOLDER_COMPONENTS = 6;

const DataDisplay: React.FunctionComponent<Props> = ({ petId }) => {
  const { response, error, status, get } = useGetPetsWeightById(petId);
  const [containerWidth, setContainerWidth] = useState<number>();

  switch (status) {
    case "error":
      return <ComponentErrorScreen message={error?.message} onTryAgain={get} />;
    default:
      return (
        <DoggoBox column onSizeChange={({ width }) => setContainerWidth(width)}>
          <DoggoBox width={BoxWidth.Full} padding={{ bottom: SizesEnum.Large }}>
            <DoggoLineChart
              width={containerWidth}
              data={response?.map(({ raw, date }) => ({ x: date, y: raw })) || []}
              loading={status !== ApiStatesTypes.Success}
            />
          </DoggoBox>
          <DoggoList label="KG">
            {response?.map((item) => (
              <DoggoList.Item key={item.id}>
                <DoggoText noBottomMargin>{item.raw}</DoggoText>
                <DoggoText noBottomMargin>{pipeDate(item.date)}</DoggoText>
              </DoggoList.Item>
            ))}
            {!response &&
              Array(PLACEHOLDER_COMPONENTS)
                .fill(null)
                .map((_, index) => (
                  <DoggoList.Item key={index}>
                    <DoggoText>
                      <DoggoPlaceholder />
                    </DoggoText>
                    <DoggoText>
                      <DoggoPlaceholder />
                    </DoggoText>
                  </DoggoList.Item>
                ))}
          </DoggoList>
        </DoggoBox>
      );
  }
};

export default DataDisplay;
