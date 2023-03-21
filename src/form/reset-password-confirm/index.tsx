import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeFormController, BmeInput } from "bme-ui";
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

  const { apiStatus, apiError, apiMessage, submit, resetForm } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} success={apiMessage} onCloseModal={resetForm}>
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
    </Form>
  );
};

export default Component;
