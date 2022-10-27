import React from "react";
import Link from "next/link";
import { DoggoGrid } from "../../ui-components";
import { ComponentErrorScreen, ComponentPetCard } from "../../component";
import { useGetPetsMy } from "../../api/queries";

const PLACEHOLDER_COMPONENTS = 3;

const DataDisplay: React.FunctionComponent = () => {
  const { response, error, get, status } = useGetPetsMy();

  switch (status) {
    case "error":
      return <ComponentErrorScreen message={error?.message} onTryAgain={get} />;
    default:
      return (
        <DoggoGrid mobile={1} desktop={2}>
          {(response || Array(PLACEHOLDER_COMPONENTS).fill(null)).map((pet, index) =>
            pet ? (
              <Link href={`/app/pet/${pet.id}`} key={pet.id}>
                <a>
                  <ComponentPetCard data={pet} />
                </a>
              </Link>
            ) : (
              <ComponentPetCard data={null} key={index} />
            ),
          )}
        </DoggoGrid>
      );
  }
};

export default DataDisplay;
