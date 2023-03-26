import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeFormController, BmeInputDate, BmeInputNumber } from "bme-ui";
import { useIntl } from "react-intl";
import { FormData, formSchema } from "./type";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";

const Component = () => {
  const intl = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const {
    apiStatus,
    apiError,
    apiMessage,
    submit,
    resetForm,
    disabled,
    loadFailed,
    loadFailedMessage,
    tryAgainLoadForm,
  } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  return (
    <Form
      onSubmit={onSubmit}
      apiStatus={apiStatus}
      error={apiError}
      success={apiMessage}
      onCloseModal={resetForm}
      loadFailed={loadFailed}
      loadFailedMessage={loadFailedMessage}
      onTryAgain={tryAgainLoadForm}
    >
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
            disabled={disabled}
          >
            <BmeInputNumber {...field} inputMode="decimal" disabled />
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
            disabled={disabled}
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
            disabled={disabled}
          >
            <BmeInputDate {...field} type="time" />
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
