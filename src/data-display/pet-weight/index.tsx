import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "bme-utils";
import { FormattedMessage } from "react-intl";
import { ComponentErrorScreen } from "../../component";
import { useGetPetsWeightById } from "../../api/queries";
import { DoggoBox, DoggoLineChart, DoggoList, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { pipeDate } from "../../pipe";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import { BoxWidth } from "../../ui-components/box";
import { ConfigContext, ConfigContextType } from "../../context/config.context";

interface Props {
  petId: string;
  onEmpty?: () => void;
}

const PLACEHOLDER_COMPONENTS = 6;

const DataDisplay: React.FunctionComponent<Props> = ({ petId, onEmpty }) => {
  const router = useRouter();
  const { response, error, status, get } = useGetPetsWeightById(petId);
  const [containerWidth, setContainerWidth] = useState<number>();
  const { userConfig } = useContext<ConfigContextType>(ConfigContext);

  const isEmptyResponse = response && isEmpty(response);

  useEffect(() => {
    if (!isEmptyResponse || !onEmpty) {
      return;
    }

    onEmpty();
  }, [onEmpty, isEmptyResponse]);

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
          <DoggoList
            label={userConfig?.weightUnits}
            emptyMessage={<FormattedMessage id="data_display.pet_weight.empty" />}
          >
            {response?.map((item) => (
              <DoggoList.Item key={item.id} onClick={() => router.push(`/app/pet/${petId}/weight/${item.id}`)}>
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
