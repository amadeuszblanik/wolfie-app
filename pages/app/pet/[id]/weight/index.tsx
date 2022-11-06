import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ComponentAddWeight } from "../../../../../src/component";
import { LayoutPet } from "../../../../../src/layout";
import { DoggoButton } from "../../../../../src/ui-components";
import { ButtonSizes } from "../../../../../src/ui-components/button";
import { DataDisplayPetWeight } from "../../../../../src/data-display";
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

  const petId = router.query.id as string;

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  return (
    <LayoutPet
      title={intl.formatMessage({ id: "page.pet_weight.header" })}
      petId={petId}
      back
      right={<AddButton onClick={() => setIsOpenAdd(true)} />}
    >
      <DataDisplayPetWeight petId={petId} onEmpty={() => setIsOpenAdd(true)} />
      {isOpenAdd && <ComponentAddWeight petId={petId} onClose={() => setIsOpenAdd(false)} />}
    </LayoutPet>
  );
};

export default App;
