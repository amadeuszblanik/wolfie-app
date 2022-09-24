import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { LayoutApp } from "../../../src/layout";
import { useRouter } from "next/router";
import usePetsSingle from "../../../src/api/queries/pets-single";
import { ComponentCardItem, ComponentCsr, ComponentErrorScreen, ComponentPetCard } from "../../../src/component";
import { DoggoGrid } from "../../../src/ui-components";
import styled from "styled-components";

const StyledPetCard = styled.div`
  grid-column: 1 / 3;
`;

const App: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { pet, petError, refetch } = usePetsSingle(id as string);

  return (
    <ComponentCsr>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutApp>
        {pet && (
          <DoggoGrid>
            <StyledPetCard>
              <ComponentPetCard {...pet} />
            </StyledPetCard>
            <ComponentCardItem icon="barbell" value={pet.currentWeight?.formatted ?? "—"} background="orange">
              <FormattedMessage id="pet.weight" />
            </ComponentCardItem>
            <ComponentCardItem icon="medical" value={pet.vaccinations ?? "—"} background="blue">
              <FormattedMessage id="pet.vaccinations" />
            </ComponentCardItem>
            <ComponentCardItem icon="medkit" value={pet.medicines ?? "—"} background="green">
              <FormattedMessage id="pet.medications" />
            </ComponentCardItem>
          </DoggoGrid>
        )}
        {petError && <ComponentErrorScreen message={petError?.message} onTryAgain={refetch} />}
      </LayoutApp>
    </ComponentCsr>
  );
};

export default App;
