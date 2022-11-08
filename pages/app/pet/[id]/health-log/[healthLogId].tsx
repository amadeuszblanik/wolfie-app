import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import React from "react";
import { isEmpty } from "bme-utils";
import { LayoutPet } from "../../../../../src/layout";
import { DataDisplayHealthLogSingle } from "../../../../../src/data-display";
import { pipeDate } from "../../../../../src/pipe";
import { ListItem } from "../../../../../src/ui-components/list-deprecated";
import useHealthLogPetSingle from "../../../../../src/api/queries/health-log-pet-single";
import type { NextPage } from "next";

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
    <LayoutPet title={intl.formatMessage({ id: "page.pet_health_log_single.header" })} back petId={String(id)}>
      <DataDisplayHealthLogSingle items={healthLogItems} error={error} status={status} />
    </LayoutPet>
  );
};

export default App;
