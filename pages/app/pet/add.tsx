import { useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../../src/layout";
import { FormPet } from "../../../src/form";
import type { NextPage } from "next";

const App: NextPage = () => {
  const intl = useIntl();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.pet_add.header" })} back>
      <FormPet />
    </LayoutApp>
  );
};

export default App;
