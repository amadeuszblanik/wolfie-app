import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeCheckbox, BmeFormController, BmeInput, BmeSelect } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { FormData, formSchema } from "./type";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { WeightUnits } from "../../types/weight-units.type";

const Component = () => {
  const intl = useIntl();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const { apiStatus, apiError, apiMessage, submit, resetForm } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} success={apiMessage} onCloseModal={resetForm}>
      <Controller
        name="email"
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
            <BmeInput {...field} type="email" />
          </BmeFormController>
        )}
      />
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
        name="password"
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
            <BmeInput {...field} type="password" />
          </BmeFormController>
        )}
      />
      <Controller
        name="passwordConfirm"
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
            <BmeInput {...field} type="password" />
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
            <BmeSelect {...register("weightUnit")}>
              <BmeSelect.Option disabled selected value="">
                ——
              </BmeSelect.Option>
              {Object.values(WeightUnits).map((weightUnit) => (
                <BmeSelect.Option key={weightUnit} value={weightUnit}>
                  <FormattedMessage id={`common.form.weight_unit.value.${weightUnit.toLowerCase()}`} />
                </BmeSelect.Option>
              ))}
            </BmeSelect>
          </BmeFormController>
        )}
      />
      <Controller
        name="gdprConsent"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({
              id: `common.form.${changeCase(field.name, ChangeCaseUtil.CamelCase, ChangeCaseUtil.SnakeCase)}.label`,
            })}
            labelPosition="left"
            name={field.name}
            error={errors[field.name] && intl.formatMessage({ id: errors[field.name]?.message })}
          >
            <BmeCheckbox {...field} type="checkbox" />
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
