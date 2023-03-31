import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeFormController, BmeInput, BmeInputDate, BmeSelect } from "bme-ui";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import useLogic from "./logic";
import { Form, MedicinesSelector } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { HealthLogKind } from "../../types/health-log-kind.types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsHealthLogActions, selectPetsHealthLogDataById } from "../../store/petsHealthLog.slice";

// @TODO Update bme-ui select to handle multiple values
// @TODO Backend fix for additionalMedicines - empty values

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const healthLogId = router.query.healthLogId as string | undefined;

  const storePetsHealthLogDataById = useAppSelector(selectPetsHealthLogDataById(healthLogId || ""));

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const { apiStatus, apiError, apiMessage, submit, resetForm } = useLogic();

  useEffect(() => {
    if (!petId) {
      return;
    }

    dispatch(petsHealthLogActions.get({ petId }));
  }, [petId]);

  useEffect(() => {
    if (storePetsHealthLogDataById) {
      setValue("kind", storePetsHealthLogDataById.kind);
      setValue("date", storePetsHealthLogDataById.date);
      setValue(
        "medicines",
        storePetsHealthLogDataById.medicines.map((medicine) => medicine.productNumber),
      );
      setValue("additionalMedicines", storePetsHealthLogDataById.additionalMedicines || []);
      setValue("diagnosis", storePetsHealthLogDataById.diagnosis || undefined);
      setValue("veterinary", storePetsHealthLogDataById.veterinary || undefined);
      setValue("description", storePetsHealthLogDataById.description || undefined);
    }
  }, [storePetsHealthLogDataById]);

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  const medicineValues = {
    medicines: watch("medicines"),
    additionalMedicines: watch("additionalMedicines"),
  };

  const handleChangeMedicinesX = (value: { medicines: string[]; additionalMedicines: string[] }) => {
    setValue("medicines", value.medicines);
    setValue("additionalMedicines", value.additionalMedicines);
  };

  const medicineError = { ...errors.medicines, ...errors.additionalMedicines };

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} success={apiMessage} onCloseModal={resetForm}>
      <Controller
        name="kind"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: String(errors[field.name]?.message) })}
          >
            <BmeSelect {...field}>
              <BmeSelect.Option disabled selected={!field.value || field.value === "-"} value="-" label="——" />
              {Object.values(HealthLogKind).map((healthLogKind) => (
                <BmeSelect.Option
                  key={healthLogKind}
                  value={healthLogKind}
                  label={intl.formatMessage({ id: `common.health_log.kind.${healthLogKind.toLowerCase()}` })}
                  selected={field.value === healthLogKind}
                />
              ))}
            </BmeSelect>
          </BmeFormController>
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: errors[field.name]?.message })}
          >
            <BmeInputDate {...field} />
          </BmeFormController>
        )}
      />
      <MedicinesSelector value={medicineValues} onChange={handleChangeMedicinesX} errorMessage={medicineError} />
      <Controller
        name="diagnosis"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: errors[field.name]?.message })}
          >
            <BmeInput {...field} />
          </BmeFormController>
        )}
      />
      <Controller
        name="nextVisit"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: errors[field.name]?.message })}
          >
            <BmeInputDate {...field} type="datetime-local" />
          </BmeFormController>
        )}
      />
      <Controller
        name="veterinary"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: errors[field.name]?.message })}
          >
            <BmeInput {...field} />
          </BmeFormController>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: errors[field.name]?.message })}
          >
            <BmeInput {...field} />
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
