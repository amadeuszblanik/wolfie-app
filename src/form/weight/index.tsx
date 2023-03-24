import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeFormController, BmeInputDate, BmeInputNumber } from "bme-ui";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase, toInputDate, toInputTime } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsWeightActions, selectPetsWeightDataById, selectPetsWeightDataLast } from "../../store/petsWeight.slice";

const DEFAULT_WEIGHT = 15;

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const weightId = router.query.weightId as string | undefined;

  const storePetsWeightDataById = useAppSelector(selectPetsWeightDataById(weightId || ""));
  const storePetsWeightDataLast = useAppSelector(selectPetsWeightDataLast);

  const {
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

    dispatch(petsWeightActions.get({ petId }));
  }, [petId]);

  useEffect(() => {
    if (storePetsWeightDataById) {
      setValue("weight", storePetsWeightDataById.raw);
      setValue("date", toInputDate(storePetsWeightDataById.date));
      setValue("time", toInputTime(storePetsWeightDataById.date));
    } else {
      setValue("weight", storePetsWeightDataLast?.raw || DEFAULT_WEIGHT);
      setValue("date", toInputDate());
      setValue("time", toInputTime());
    }
  }, [storePetsWeightDataById]);

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} success={apiMessage} onCloseModal={resetForm}>
      <Controller
        name="weight"
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
            <BmeInputNumber {...field} inputMode="decimal" />
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
      <Controller
        name="time"
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
            <BmeInputDate {...field} type="time" />
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
