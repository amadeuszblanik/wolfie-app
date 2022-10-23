import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import { useRouter } from "next/router";
import { DoggoButton } from "../../src/ui-components";
import { LayoutApp } from "../../src/layout";
import { ButtonSizes } from "../../src/ui-components/button";
import { DataDisplayMyPets } from "../../src/data-display";
import type { NextPage } from "next";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FunctionComponent<AddButtonProps> = ({ onClick }) => (
  <DoggoButton onClick={onClick} size={ButtonSizes.Small}>
    <FormattedMessage id="common.add" />
  </DoggoButton>
);

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  return (
    <LayoutApp
      title={intl.formatMessage({ id: "page.app.header" })}
      right={<AddButton onClick={() => router.push("/app/pet/add")} />}
    >
      <DataDisplayMyPets />
    </LayoutApp>
  );
};

export default App;
