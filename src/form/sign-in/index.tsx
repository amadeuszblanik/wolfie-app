import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeCheckbox, BmeFormController, BmeInput } from "bme-ui";
import { useIntl } from "react-intl";
import { FormSignInData, formSignInSchema } from "./type";
import useLogic from "./logic";
import { Form } from "../../components";

const Component = () => {
  const intl = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignInData>({
    resolver: yupResolver(formSignInSchema),
  });

  const { apiStatus, apiError, submit, resetForm } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} onCloseModal={resetForm}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({ id: "common.form.username.label" })}
            name={field.name}
            error={errors.username && intl.formatMessage({ id: errors.username.message })}
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
            label={intl.formatMessage({ id: "common.form.password.label" })}
            name={field.name}
            error={errors.password && intl.formatMessage({ id: errors.password.message })}
          >
            <BmeInput {...field} type="password" />
          </BmeFormController>
        )}
      />
      <Controller
        name="keepSignIn"
        control={control}
        render={({ field }) => (
          <BmeFormController
            width="100%"
            label={intl.formatMessage({ id: "common.form.keep_sign_in.label" })}
            labelPosition="left"
            name={field.name}
            error={errors.keepSignIn && intl.formatMessage({ id: errors.keepSignIn.message })}
          >
            <BmeCheckbox {...field} type="checkbox" />
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
