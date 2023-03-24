import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeFormController, BmeInput, BmeSelect } from "bme-ui";
import { useIntl } from "react-intl";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { WeightUnits } from "../../types/weight-units.type";
import { useAppSelector } from "../../hooks";
import { selectProfileData } from "../../store/profile.slice";

const Component = () => {
  const intl = useIntl();

  const storeProfileData = useAppSelector(selectProfileData);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const { apiStatus, apiError, apiMessage, submit, resetForm } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  useEffect(() => {
    if (storeProfileData) {
      setValue("firstName", storeProfileData.firstName);
      setValue("lastName", storeProfileData.lastName);
      setValue("weightUnit", storeProfileData.weightUnit);
    }
  }, [storeProfileData]);

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} success={apiMessage} onCloseModal={resetForm}>
      <Controller
        name="firstName"
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
        name="lastName"
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
        name="weightUnit"
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
              {Object.values(WeightUnits).map((weightUnit) => (
                <BmeSelect.Option
                  key={weightUnit}
                  value={weightUnit}
                  label={intl.formatMessage({ id: `common.form.weight_unit.value.${weightUnit.toLowerCase()}` })}
                  selected={field.value === weightUnit}
                />
              ))}
            </BmeSelect>
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
