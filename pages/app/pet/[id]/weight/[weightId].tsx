import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import React from "react";
import { LayoutApp } from "../../../../../src/layout";
import { DoggoGrid } from "../../../../../src/ui-components";
import { DataDisplayPet, DataDisplayPetWeightById } from "../../../../../src/data-display";
import type { NextPage } from "next";

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id, weightId } = router.query;

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.pet_weight.header" })} back>
      <DoggoGrid mobile={1} desktop={1}>
        <DataDisplayPet petId={String(id)} />
        <DataDisplayPetWeightById petId={String(id)} weightId={String(weightId)} />
      </DoggoGrid>
    </LayoutApp>
  );
};

export default App;
