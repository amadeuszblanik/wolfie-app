import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import React from "react";
import { LayoutPet } from "../../../../../src/layout";
import { DataDisplayHealthLogSingle } from "../../../../../src/data-display";
import type { NextPage } from "next";

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const petId = router.query.id as string;
  const healthLogId = router.query.healthLogId as string;

  return (
    <LayoutPet title={intl.formatMessage({ id: "page.pet_health_log_single.header" })} back petId={petId}>
      <DataDisplayHealthLogSingle petId={petId} healthLogId={healthLogId} />
    </LayoutPet>
  );
};

export default App;
