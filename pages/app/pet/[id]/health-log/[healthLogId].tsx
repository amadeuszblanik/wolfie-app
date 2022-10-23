import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LayoutPet } from "../../../../../src/layout";
import { DoggoButton } from "../../../../../src/ui-components";
import { ButtonSizes } from "../../../../../src/ui-components/button";
import { DataDisplayHealthLog, DataDisplayHealthLogSingle } from "../../../../../src/data-display";
import { ComponentAddHealthLog } from "../../../../../src/component";
import useHealthLogPet from "../../../../../src/api/queries/health-log-pet";
import { pipeDate } from "../../../../../src/pipe";
import { ListItem } from "../../../../../src/ui-components/list";
import Link from "next/link";
import useHealthLogPetSingle from "../../../../../src/api/queries/health-log-pet-single";
import { isEmpty } from "bme-utils";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FunctionComponent<AddButtonProps> = ({ onClick }) => (
  <DoggoButton onClick={onClick} size={ButtonSizes.Small}>
    <FormattedMessage id="common.add" />
  </DoggoButton>
);

// export interface HealthLogResponseModel {
//     id: string;
//     kind: HealthLogKindTypes;
//     date: string;
//     medicines: ShortMedicineResponseModel[];
//     additionalMedicines: string[];
//     veterinary: string | null;
//     diagnosis: string | null;
//     nextVisit: Date | null;
//     description: string | null;
//     addedBy: UserResponseModel;
//     createdAt: Date;
//     updatedAt: Date;
// }

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id, healthLogId } = router.query;

  const { response, error, status } = useHealthLogPetSingle(String(id), String(healthLogId));

  const healthLogItems: ListItem[][] = [];

  if (response?.kind) {
    healthLogItems.push([
      intl.formatMessage({ id: "health_log.kind" }),
      intl.formatMessage({ id: `health-log.kind.${response.kind}` }),
    ]);
  }

  if (response?.date) {
    healthLogItems.push([intl.formatMessage({ id: "health_log.date" }), pipeDate(response.date)]);
  }

  if (response?.medicines || response?.additionalMedicines) {
    const medicinesList = [];

    if (response?.medicines) {
      medicinesList.push(...response.medicines.map(({ name }) => name));
    }

    if (response?.additionalMedicines) {
      medicinesList.push(...response.additionalMedicines);
    }

    healthLogItems.push([
      intl.formatMessage({ id: "health_log.medicines" }),
      medicinesList.filter((value) => !isEmpty(value)).join(", "),
    ]);
  }

  if (response?.veterinary) {
    healthLogItems.push([intl.formatMessage({ id: "health_log.veterinary" }), response.veterinary]);
  }

  if (response?.diagnosis) {
    healthLogItems.push([intl.formatMessage({ id: "health_log.diagnosis" }), response.diagnosis]);
  }

  if (response?.nextVisit) {
    healthLogItems.push([intl.formatMessage({ id: "health_log.next_visit" }), pipeDate(response.nextVisit)]);
  }

  if (response?.description) {
    healthLogItems.push([intl.formatMessage({ id: "health_log.description" }), response.description]);
  }

  if (response?.addedBy) {
    healthLogItems.push([
      intl.formatMessage({ id: "health_log.added_by" }),
      `${response.addedBy.firstName} ${response.addedBy.lastName}`,
    ]);
  }

  return (
    <>
      <Head>
        <title>Wolfie.app - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutPet title={intl.formatMessage({ id: "page.pet_health_log_single.header" })} back petId={String(id)}>
        <DataDisplayHealthLogSingle items={healthLogItems} error={error} status={status} />
      </LayoutPet>
    </>
  );
};

export default App;
