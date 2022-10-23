import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import { LayoutApp } from "../../../../src/layout";
import { useRouter } from "next/router";
import { DoggoButton } from "../../../../src/ui-components";
import styled from "styled-components";
import React from "react";
import { ButtonSizes } from "../../../../src/ui-components/button";
import { DataDisplayPetDashboard } from "../../../../src/data-display";

interface EditButtonProps {
  onClick: () => void;
}

const StyledPetCard = styled.div`
  @media screen and (min-width: 900px) {
    grid-column: 1 / 4;
  }
`;

const EditButton: React.FunctionComponent<EditButtonProps> = ({ onClick }) => (
  <DoggoButton onClick={onClick} size={ButtonSizes.Small}>
    <FormattedMessage id="common.edit" />
  </DoggoButton>
);

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id } = router.query;

  // const { pet, petError, refetch } = usePetsSingle(id as string);

  return (
    <LayoutApp
      title={intl.formatMessage({ id: "page.pet.header" })}
      back
      right={<EditButton onClick={() => router.push(`/app/pet/${id}/edit`)} />}
    >
      <DataDisplayPetDashboard petId={String(id)} />
      {/* {pet && (*/}
      {/*  <DoggoGrid mobile={1}>*/}
      {/*    <StyledPetCard>*/}
      {/*      <ComponentPetCard {...pet} />*/}
      {/*    </StyledPetCard>*/}
      {/*    <Link href={`/app/pet/${id}/weight`}>*/}
      {/*      <a>*/}
      {/*        <ComponentCardItem icon="barbell" value={pet.currentWeight?.formatted ?? "—"} background="blue">*/}
      {/*          <FormattedMessage id="pet.weight" />*/}
      {/*        </ComponentCardItem>*/}
      {/*      </a>*/}
      {/*    </Link>*/}
      {/*    <Link href={`/app/pet/${id}/health-log`}>*/}
      {/*      <a>*/}
      {/*        <ComponentCardItem icon="heart" value={pet.healthLog ?? "—"} background="red">*/}
      {/*          <FormattedMessage id="pet.health_log" />*/}
      {/*        </ComponentCardItem>*/}
      {/*      </a>*/}
      {/*    </Link>*/}
      {/*  </DoggoGrid>*/}
      {/* )}*/}
      {/* {petError && <ComponentErrorScreen message={petError?.message} onTryAgain={refetch} />}*/}
    </LayoutApp>
  );
};

export default App;
