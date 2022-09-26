import type { NextPage } from "next";
import Head from "next/head";
import { useIntl } from "react-intl";
import { LayoutApp } from "../../../../src/layout";
import { useRouter } from "next/router";
import usePetsSingle from "../../../../src/api/queries/pets-single";
import { ComponentCsr, ComponentErrorScreen, ComponentPetCard } from "../../../../src/component";
import { DoggoGrid, DoggoLineChart, DoggoList } from "../../../../src/ui-components";
import styled from "styled-components";
import usePetsWeight from "../../../../src/api/queries/pets-weight";
import { pipeDate } from "../../../../src/pipe";
import { useState } from "react";

const StyledPetCard = styled.div`
  @media screen and (min-width: 900px) {
    grid-column: 1 / 2;
  }
`;

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id } = router.query;

  const [containerWidth, setContainerWidth] = useState<number>();

  const { pet, petError, refetch: refetchPet } = usePetsSingle(id as string);
  const { petsWeight, petsWeightError, refetch: refetchPetWeight } = usePetsWeight(id as string);

  const handleChangeContainerWidth = ({ width }: { width: number }) => {
    setContainerWidth(width);
  };

  const handleTryAgain = () => {
    void refetchPet();
    void refetchPetWeight();
  };

  return (
    <ComponentCsr>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.pet_weight.header" })} back>
        {pet && petsWeight && (
          <DoggoGrid mobile={1} desktop={1} onSizeChange={handleChangeContainerWidth}>
            <StyledPetCard>
              <ComponentPetCard {...pet} />
            </StyledPetCard>
            <DoggoLineChart width={containerWidth} data={petsWeight.map(({ raw, date }) => ({ x: date, y: raw }))} />
            <DoggoList label="KG" items={petsWeight.map((weight) => [weight.formatted, pipeDate(weight.date)]) ?? []} />
          </DoggoGrid>
        )}
        {(petError || petsWeightError) && (
          <ComponentErrorScreen message={petError?.message} onTryAgain={handleTryAgain} />
        )}
      </LayoutApp>
    </ComponentCsr>
  );
};

export default App;
