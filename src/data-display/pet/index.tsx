import React from "react";
import { ComponentErrorScreen, ComponentPetCard } from "../../component";
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
      return <ComponentPetCard data={response || null} />;
  }
};

export default DataDisplay;
