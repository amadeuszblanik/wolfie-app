import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import React from "react";
import { LayoutPet } from "../../../../../src/layout";
import { DataDisplayPetWeightById } from "../../../../../src/data-display";
import type { NextPage } from "next";

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const petId = router.query.id as string;
  const weightId = router.query.weightId as string;

  return (
    <LayoutPet title={intl.formatMessage({ id: "page.pet_weight.header" })} petId={petId} back>
      <DataDisplayPetWeightById petId={petId} weightId={weightId} />
    </LayoutPet>
  );
};

export default App;
