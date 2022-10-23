import React from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { DoggoGrid, DoggoGridItem } from "../../ui-components";
import { ComponentCardItem, ComponentErrorScreen, ComponentPetCard } from "../../component";
import { useGetPetsById } from "../../api/queries";

interface Props {
  petId: string;
}

const DataDisplay: React.FunctionComponent<Props> = ({ petId }) => {
  const { response, error, status, get } = useGetPetsById(petId);

  switch (status) {
    case "error":
      return <ComponentErrorScreen message={error?.message} onTryAgain={get} />;
    default:
      return (
        <DoggoGrid mobile={1}>
          <DoggoGridItem desktop={4}>
            <ComponentPetCard data={response || null} />
          </DoggoGridItem>
          <Link href={`/app/pet/${petId}/weight`}>
            <a>
              <ComponentCardItem
                icon="barbell"
                value={response?.currentWeight?.formatted ?? "—"}
                background="blue"
                loading={!response}
              >
                <FormattedMessage id="pet.weight" />
              </ComponentCardItem>
            </a>
          </Link>
          <Link href={`/app/pet/${petId}/health-log`}>
            <a>
              <ComponentCardItem icon="heart" value={response?.healthLog ?? "—"} background="red" loading={!response}>
                <FormattedMessage id="pet.health_log" />
              </ComponentCardItem>
            </a>
          </Link>
        </DoggoGrid>
      );
  }
};

export default DataDisplay;
