import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "bme-utils";
import { FormattedMessage, useIntl } from "react-intl";
import { ComponentErrorScreen } from "../../component";
import { useGetPetsWeightById } from "../../api/queries";
import { DoggoBox, DoggoButton, DoggoLineChart, DoggoList, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { pipeDate } from "../../pipe";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import { BoxWidth } from "../../ui-components/box";
import { ConfigContext, ConfigContextType } from "../../context/config.context";
import { RemoveEntryWeightById } from "../../remove-entry";

interface Props {
  petId: string;
  onEmpty?: () => void;
}

const PLACEHOLDER_COMPONENTS = 6;

const DataDisplay: React.FunctionComponent<Props> = ({ petId, onEmpty }) => {
  const intl = useIntl();
  const router = useRouter();
  const { response, error, status, get } = useGetPetsWeightById(petId);
  const { userConfig } = useContext<ConfigContextType>(ConfigContext);
  const [removeEntryId, setRemoveEntryId] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const isEmptyResponse = response && isEmpty(response);

  const removeEntry = (response || []).find(({ id }) => id === removeEntryId);
  const removeEntryMessage = removeEntry
    ? `${removeEntry.formatted} ${intl.formatMessage({ id: "common.on_date" })} ${pipeDate(removeEntry.date)}`
    : "";

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
        <>
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
                <DoggoList.Item
                  key={item.id}
                  onClick={() => router.push(`/app/pet/${petId}/weight/${item.id}`)}
                  actions={
                    <DoggoButton variant="red" onClick={() => setRemoveEntryId(item.id)}>
                      <FormattedMessage id="common.delete" />
                    </DoggoButton>
                  }
                >
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
          {removeEntryId && (
            <RemoveEntryWeightById
              petId={petId}
              weightId={removeEntryId}
              entry={removeEntryMessage}
              onClose={() => setRemoveEntryId(null)}
            />
          )}
        </>
      );
  }
};

export default DataDisplay;
