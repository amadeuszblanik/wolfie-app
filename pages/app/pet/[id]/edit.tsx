import { useIntl } from "react-intl";
import React from "react";
import { useRouter } from "next/router";
import { LayoutApp } from "../../../../src/layout";
import { DoggoBox } from "../../../../src/ui-components";
import { SizesEnum } from "../../../../src/settings/sizes";
import { DataDisplayPet } from "../../../../src/data-display";
import { FormPet } from "../../../../src/form";
import type { NextPage } from "next";

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id } = router.query;

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.pet_edit.header" })} back>
      <DoggoBox padding={{ bottom: SizesEnum.ExtraLarge }}>
        <DataDisplayPet petId={String(id)} />
      </DoggoBox>
      <FormPet petId={String(id)} />
    </LayoutApp>
  );
};

export default App;
