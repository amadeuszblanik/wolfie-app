import { Controller } from "react-hook-form";
import { BmeFormController, BmeInput } from "bme-ui";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";

const Component = () => {
  const router = useRouter();
  const intl = useIntl();

  const {
    apiStatus,
    apiError,
    apiMessage,
    submit,
    loadFailed,
    loadFailedMessage,
    tryAgainLoadForm,
    control,
    handleSubmit,
    errors,
  } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  const handleCloseModal = (success: boolean) => {
    if (!success) {
      return;
    }

    const path = router.asPath.split("/");
    path.pop();

    void router.push(path.join("/"));
  };

  return (
    <Form
      onSubmit={onSubmit}
      apiStatus={apiStatus}
      error={apiError}
      success={apiMessage}
      onCloseModal={handleCloseModal}
      loadFailed={loadFailed}
      loadFailedMessage={loadFailedMessage}
      onTryAgain={tryAgainLoadForm}
    >
      <Controller
        name="name"
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
        name="address"
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
        name="city"
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
        name="postCode"
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
        name="country"
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
        name="phoneNumber"
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
            <BmeInput {...field} />
          </BmeFormController>
        )}
      />
    </Form>
  );
};

export default Component;
