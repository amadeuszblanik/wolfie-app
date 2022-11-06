import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { isEmpty } from "bme-utils";
import { useGetHealthLog } from "../../api/queries";
import { ComponentErrorScreen, ComponentListPlaceholder } from "../../component";
import { DoggoButton, DoggoList, DoggoText } from "../../ui-components";
import { pipeDate } from "../../pipe";
import { RemoveEntryHealthLogById } from "../../remove-entry";
import { ButtonSizes } from "../../ui-components/button";
import { ApiStatesTypes } from "../../types/api-states.types";

interface Props {
  petId: string;
  onEmpty?: () => void;
}

const DataDisplay: React.FunctionComponent<Props> = ({ petId, onEmpty }) => {
  const intl = useIntl();
  const router = useRouter();
  const { response, error, status, request } = useGetHealthLog(petId);

  const [removeEntryId, setRemoveEntryId] = useState<string | null>(null);

  const isEmptyResponse = response && isEmpty(response);

  const removeEntry = (response || []).find(({ id }) => id === removeEntryId);
  const removeEntryMessage = removeEntry
    ? `${intl.formatMessage({ id: `health-log.kind.${removeEntry.kind}` })} ${intl.formatMessage({
        id: "common.on_date",
      })} ${pipeDate(removeEntry.date)}`
    : "";

  useEffect(() => {
    if (!isEmptyResponse || !onEmpty) {
      return;
    }

    onEmpty();
  }, [onEmpty, isEmptyResponse]);

  switch (status) {
    case ApiStatesTypes.Error:
      return <ComponentErrorScreen message={error?.message} onTryAgain={request} />;
    case ApiStatesTypes.Loading:
      return (
        <>
          <DoggoList>
            <ComponentListPlaceholder />
          </DoggoList>
        </>
      );
    default:
      return (
        <>
          <DoggoList>
            {response ? (
              response.map(({ id, kind, date }) => (
                <DoggoList.Item
                  key={id}
                  onClick={() => router.push(`/app/pet/${petId}/health-log/${id}`)}
                  actions={
                    <DoggoButton variant="red" size={ButtonSizes.Small} onClick={() => setRemoveEntryId(id)}>
                      <FormattedMessage id="common.delete" />
                    </DoggoButton>
                  }
                >
                  <DoggoText>
                    <FormattedMessage id={`health-log.kind.${kind}`} />
                  </DoggoText>
                  <DoggoText>{pipeDate(date)}</DoggoText>
                </DoggoList.Item>
              ))
            ) : (
              <ComponentListPlaceholder />
            )}
          </DoggoList>
          {removeEntryId && (
            <RemoveEntryHealthLogById
              petId={petId}
              entryId={removeEntryId}
              entry={removeEntryMessage}
              onClose={() => setRemoveEntryId(null)}
            />
          )}
        </>
      );
  }
};

export default DataDisplay;
