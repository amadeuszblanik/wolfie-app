import React from "react";
import { ComponentErrorScreen } from "../../component";
import { useGetPetsWeightSingleById } from "../../api/queries";
import { FormPetWeight } from "../../form";
import { WeightUnits } from "../../api/types/weight-units.types";
import { ApiStatesTypes } from "../../types/api-states.types";

interface Props {
  petId: string;
  weightId: string;
}

const DataDisplay: React.FunctionComponent<Props> = ({ petId, weightId }) => {
  const { response, error, status, get } = useGetPetsWeightSingleById(petId, weightId);

  switch (status) {
    case "error":
      return <ComponentErrorScreen message={error?.message} onTryAgain={get} />;
    default:
      return (
        <FormPetWeight
          petId={petId}
          weightId={weightId}
          initialData={response}
          weightUnit={WeightUnits.Kilogram}
          loading={status !== ApiStatesTypes.Success}
        />
      );
  }
};

export default DataDisplay;
