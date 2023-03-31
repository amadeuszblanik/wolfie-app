import { Controller } from "react-hook-form";
import { BmeFormController, BmeInputDate, BmeInputNumber } from "bme-ui";
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
    resetForm,
    disabled,
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

    resetForm();
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
