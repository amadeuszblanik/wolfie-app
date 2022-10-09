import type { NextPage } from "next";
import Head from "next/head";
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
  const refresh = () => {
    return;
  };

  const [isOpenAdd, setIsOpenAdd] = useState(true);
  const { response, error, status } = useHealthLogPet(String(id));

  const handleOnSuccess = () => {
    setIsOpenAdd(false);
    refresh();
  };

  const healthLogItems = response?.map(({ kind, date }) => [String(kind), pipeDate(date)]) || [];

  return (
    <>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

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
    </>
  );
};

export default App;
