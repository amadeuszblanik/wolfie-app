import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ComponentAddWeight } from "../../../../../src/component";
import { LayoutApp } from "../../../../../src/layout";
import { DoggoButton, DoggoGrid } from "../../../../../src/ui-components";
import { ButtonSizes } from "../../../../../src/ui-components/button";
import { DataDisplayPet, DataDisplayPetWeight } from "../../../../../src/data-display";
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

  const { id } = router.query;

  const [isOpenAddWeight, setIsOpenAddWeight] = useState(false);

  const handleEmpty = () => {
    setIsOpenAddWeight(true);
  };

  return (
    <LayoutApp
      title={intl.formatMessage({ id: "page.pet_weight.header" })}
      back
      right={<AddButton onClick={() => setIsOpenAddWeight(true)} />}
    >
      <DoggoGrid mobile={1} desktop={1}>
        <DataDisplayPet petId={String(id)} />
        <DataDisplayPetWeight petId={String(id)} onEmpty={handleEmpty} />
      </DoggoGrid>
      {isOpenAddWeight && <ComponentAddWeight petId={String(id)} onClose={() => setIsOpenAddWeight(false)} />}
    </LayoutApp>
  );
};

export default App;
