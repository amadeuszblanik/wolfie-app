import React from "react";
import { FormattedMessage } from "react-intl";
import { isEmpty } from "bme-utils";
import { DoggoList, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { ComponentErrorScreen } from "../../component";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useGetHealthLogSingle } from "../../api/queries";
import { pipeDate } from "../../pipe";

interface Props {
  petId: string;
  healthLogId: string;
}

const DataDisplay: React.FunctionComponent<Props> = ({ petId, healthLogId }) => {
  const { response, error, status, request } = useGetHealthLogSingle(petId, healthLogId);

  const medicines: string[] = [];

  if (response) {
    medicines.concat(response.medicines.map(({ name }) => name));
    medicines.concat(response.additionalMedicines);
  }

  switch (status) {
    case ApiStatesTypes.Error:
      return <ComponentErrorScreen message={error?.message} onTryAgain={request} />;
    default:
      return (
        <>
          <DoggoList>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.kind" />
              </DoggoText>
              <DoggoText>
                {response ? <FormattedMessage id={`health-log.kind.${response.kind}`} /> : <DoggoPlaceholder />}
              </DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.kind" />
              </DoggoText>
              <DoggoText>{response ? pipeDate(response.date) : <DoggoPlaceholder />}</DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.medicines" />
              </DoggoText>
              <DoggoText>
                {response ? !isEmpty(medicines) ? medicines.join(", ") : "—" : <DoggoPlaceholder />}
              </DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.veterinary" />
              </DoggoText>
              <DoggoText>{response ? response.veterinary || "—" : <DoggoPlaceholder />}</DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.diagnosis" />
              </DoggoText>
              <DoggoText>{response ? response.diagnosis || "—" : <DoggoPlaceholder />}</DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.next_visit" />
              </DoggoText>
              <DoggoText>
                {response ? response.nextVisit ? pipeDate(response.nextVisit) : "—" : <DoggoPlaceholder />}
              </DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.description" />
              </DoggoText>
              <DoggoText>{response ? response.description || "—" : <DoggoPlaceholder />}</DoggoText>
            </DoggoList.Item>
            <DoggoList.Item>
              <DoggoText>
                <FormattedMessage id="health_log.added_by" />
              </DoggoText>
              <DoggoText>{response ? response.addedBy.fullName || "—" : <DoggoPlaceholder />}</DoggoText>
            </DoggoList.Item>
          </DoggoList>
        </>
      );
  }
};

export default DataDisplay;
