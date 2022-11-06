import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LayoutPet } from "../../../../../src/layout";
import { ButtonSizes } from "../../../../../src/ui-components/button";
import { DataDisplayHealthLog } from "../../../../../src/data-display";
import { ComponentAddHealthLog } from "../../../../../src/component";
import { DoggoButton } from "../../../../../src/ui-components";
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

  const id = router.query.id as string;

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  return (
    <LayoutPet
      title={intl.formatMessage({ id: "page.pet_health_log.header" })}
      petId={id}
      back
      right={<AddButton onClick={() => setIsOpenAdd(true)} />}
    >
      <DataDisplayHealthLog petId={id} onEmpty={() => setIsOpenAdd(true)} />
      {isOpenAdd && (
        <ComponentAddHealthLog petId={id} onClose={() => setIsOpenAdd(false)} onSuccess={() => setIsOpenAdd(false)} />
      )}
    </LayoutPet>
  );
};

export default App;
