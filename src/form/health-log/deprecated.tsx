import {
  BmeBox,
  BmeButton,
  BmeInputDateDeprecated,
  BmeInputDeprecated,
  BmeSelectDeprecated,
  BmeText,
  BmeTextArea,
} from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { SelectItem } from "bme-ui/dist/atoms/select-deperacated/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormDeprecated, Loader } from "../../components";
import { enumToList, toInputDate, toInputDatetimeLocal } from "../../utils";
import { HealthLogKind } from "../../types/health-log-kind.types";
import { medicinesActions, selectMedicinesDataAsList } from "../../store/medicines.slice";
import {
  petsHealthLogActions,
  selectPetsHealthLogDataById,
  selectPetsHealthLogPatchError,
  selectPetsHealthLogPatchStatus,
  selectPetsHealthLogPostError,
  selectPetsHealthLogPostStatus,
  selectPetsHealthLogStatus,
} from "../../store/petsHealthLog.slice";
import { PetsPetIdHealthLogPostPayload } from "../../services/api/types/pets/:petId/health-log/post/payload.type";

// @TODO Add bme-ui multiselect

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const healthLogId = router.query.healthLogId as string | undefined;

  const isUpdate = !!healthLogId;

  const storePetsHealthLogStatus = useAppSelector(selectPetsHealthLogStatus);
  const storePetsHealthLogPostStatus = useAppSelector(selectPetsHealthLogPostStatus);
  const storePetsHealthLogPostError = useAppSelector(selectPetsHealthLogPostError);
  const storePetsHealthLogPatchStatus = useAppSelector(selectPetsHealthLogPatchStatus);
  const storePetsHealthLogPatchError = useAppSelector(selectPetsHealthLogPatchError);
  const storePetsHealthLogDataById = useAppSelector(selectPetsHealthLogDataById(healthLogId || ""));
  const storeMedicinesDataAsList = useAppSelector(selectMedicinesDataAsList);

  const status = isUpdate ? storePetsHealthLogPatchStatus : storePetsHealthLogPostStatus;
  const error = isUpdate ? storePetsHealthLogPatchError : storePetsHealthLogPostError;

  const isLoadingHealthLogs = storePetsHealthLogStatus === "pending" && status !== "success";

  const isError = status === "error";

  const healthLogKindList: SelectItem[] = enumToList(HealthLogKind, "common.health_log.kind", intl);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");

  const [kind, setKind] = useState<SelectItem | null>(
    healthLogKindList.find((item) => item.key === HealthLogKind.Treatment) || null,
  );
  const [date, setDate] = useState(toInputDate());
  const [medicines, setMedicines] = useState<SelectItem[]>([]);
  const [additionalMedicines, setAdditionalMedicines] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [veterinary, setVeterinary] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(medicinesActions.get());
    dispatch(petsHealthLogActions.resetPost());
    dispatch(petsHealthLogActions.resetPatch());
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (storePetsHealthLogDataById === undefined && petId) {
      dispatch(petsHealthLogActions.get({ petId }));
    }
  }, [storePetsHealthLogDataById, petId, dispatch]);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (status === "success") {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [error, status]);

  useEffect(() => {
    if (storePetsHealthLogDataById) {
      setKind(healthLogKindList.find((item) => item.key === storePetsHealthLogDataById.kind) || null);
      setDate(toInputDate(new Date(storePetsHealthLogDataById.date)));
      setMedicines(
        storeMedicinesDataAsList.filter((item) =>
          storePetsHealthLogDataById.medicines.map(({ productNumber }) => productNumber).includes(item.key),
        ) || null,
      );
      setAdditionalMedicines(storePetsHealthLogDataById.additionalMedicines.join(", "));
      setDiagnosis(storePetsHealthLogDataById.diagnosis || "");
      setNextVisit(
        storePetsHealthLogDataById.nextVisit
          ? toInputDatetimeLocal(new Date(storePetsHealthLogDataById.nextVisit))
          : "",
      );
      setVeterinary(storePetsHealthLogDataById.veterinary || "");
      setDescription(storePetsHealthLogDataById.description || "");
    }
  }, [storePetsHealthLogDataById]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: PetsPetIdHealthLogPostPayload = {
      kind: kind?.key as HealthLogKind,
      date,
      medicines: medicines.map((item) => item.key),
      additionalMedicines,
      diagnosis,
      nextVisit: new Date(nextVisit),
      veterinary,
      description,
    };

    if (!petId) {
      // @TODO Add validation

      return;
    }

    if (healthLogId) {
      dispatch(
        petsHealthLogActions.patch({
          petId,
          healthLogId,
          payload,
        }),
      );

      return;
    }

    dispatch(
      petsHealthLogActions.post({
        petId,
        payload,
      }),
    );
  };

  return (
    <FormDeprecated
      onSubmit={handleSubmit}
      apiStatus={status}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? error ||
                intl.formatMessage({
                  id: petId ? "common.form.health_log_update.error" : "common.form.health_log_add.error",
                })
              : intl.formatMessage({
                  id: petId ? "common.form.health_log_update.success" : "common.form.health_log_add.success",
                })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <>
        <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
          <BmeBox width="100%" margin="no|no|sm">
            <BmeSelectDeprecated
              name="kind"
              label={intl.formatMessage({ id: "common.form.health_log_kind.label" })}
              list={healthLogKindList}
              value={kind}
              onValue={setKind}
              width="100%"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeInputDateDeprecated
              name="date"
              value={date}
              label={intl.formatMessage({ id: "common.form.date.label" })}
              onValue={setDate}
              width="100%"
              type="date"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeSelectDeprecated
              name="medicines"
              label={intl.formatMessage({ id: "common.form.medicines.label" })}
              list={storeMedicinesDataAsList}
              value={medicines}
              onValue={setMedicines}
              width="100%"
              multiple
              searchable
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeInputDeprecated
              name="additional-medicines"
              value={additionalMedicines}
              label={intl.formatMessage({ id: "common.form.additional_medicines.label" })}
              onValue={setAdditionalMedicines}
              hint={intl.formatMessage({ id: "common.form.additional_medicines.hint" })}
              width="100%"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeTextArea
              name="diagnosis"
              value={diagnosis}
              label={intl.formatMessage({ id: "common.form.diagnosis.label" })}
              onValue={setDiagnosis}
              width="100%"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeInputDateDeprecated
              name="next-visit"
              value={nextVisit}
              label={intl.formatMessage({ id: "common.form.next_visit.label" })}
              onValue={setNextVisit}
              width="100%"
              type="datetime-local"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeInputDeprecated
              name="veterinary"
              value={veterinary}
              label={intl.formatMessage({ id: "common.form.vet.label" })}
              onValue={setVeterinary}
              width="100%"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeTextArea
              name="description"
              value={description}
              label={intl.formatMessage({ id: "common.form.description.label" })}
              onValue={setDescription}
              width="100%"
            />
          </BmeBox>
          <BmeBox margin="no|no|lg">
            <BmeButton type="submit">
              <FormattedMessage id={isUpdate ? "common.form.update.label" : "common.form.add.label"} />
            </BmeButton>
          </BmeBox>
        </BmeBox>
        {isLoadingHealthLogs && <Loader />}
      </>
    </FormDeprecated>
  );
};

export default Component;
