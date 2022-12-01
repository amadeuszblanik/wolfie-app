import { useIntl } from "react-intl";
import React from "react";
import { useRouter } from "next/router";
import { LayoutPet } from "../../../../src/layout";
import { FormPet } from "../../../../src/form";
import type { NextPage } from "next";

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const petId = router.query.id as string;

  return (
    <LayoutPet title={intl.formatMessage({ id: "page.pet_edit.header" })} petId={petId} back>
      <FormPet petId={petId} />
    </LayoutPet>
  );
};

export default App;
