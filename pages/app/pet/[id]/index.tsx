import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React from "react";
import { DoggoButton } from "../../../../src/ui-components";
import { LayoutApp } from "../../../../src/layout";
import { ButtonSizes } from "../../../../src/ui-components/button";
import { DataDisplayPetDashboard } from "../../../../src/data-display";
import type { NextPage } from "next";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FunctionComponent<EditButtonProps> = ({ onClick }) => (
  <DoggoButton onClick={onClick} size={ButtonSizes.Small}>
    <FormattedMessage id="common.edit" />
  </DoggoButton>
);

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const id = router.query.id as string;

  return (
    <LayoutApp
      title={intl.formatMessage({ id: "page.pet.header" })}
      back
      right={<EditButton onClick={() => router.push(`/app/pet/${id}/edit`)} />}
    >
      <DataDisplayPetDashboard petId={id} />
    </LayoutApp>
  );
};

export default App;
