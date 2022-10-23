import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LayoutPet } from "../../../../../src/layout";
import { DoggoButton } from "../../../../../src/ui-components";
import { ButtonSizes } from "../../../../../src/ui-components/button";
import { DataDisplayHealthLog } from "../../../../../src/data-display";
import { ComponentAddHealthLog } from "../../../../../src/component";
import useHealthLogPet from "../../../../../src/api/queries/health-log-pet";
import { pipeDate } from "../../../../../src/pipe";
import { ListItem } from "../../../../../src/ui-components/list-deprecated";
import Link from "next/link";

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

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { response, error, status, get } = useHealthLogPet(String(id));

  const handleOnSuccess = () => {
    setIsOpenAdd(false);
    get();
  };

  const healthLogItems: ListItem[] = Array.isArray(response)
    ? response.map(({ id: healthLogId, kind, date }) => [
        <Link key={healthLogId} href={`/app/pet/${String(id)}/health-log/${healthLogId}`}>
          <a>
            <DoggoButton size={ButtonSizes.Small}>{kind}</DoggoButton>
          </a>
        </Link>,
        pipeDate(date),
      ])
    : [];

  return (
    <LayoutPet
      title={intl.formatMessage({ id: "page.pet_health_log.header" })}
      back
      petId={String(id)}
      right={<AddButton onClick={() => setIsOpenAdd(true)} />}
    >
      <DataDisplayHealthLog items={healthLogItems} error={error} status={status} />
      {isOpenAdd && (
        <ComponentAddHealthLog petId={String(id)} onClose={() => setIsOpenAdd(false)} onSuccess={handleOnSuccess} />
      )}
    </LayoutPet>
  );
};

export default App;
