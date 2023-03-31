import { Controller } from "react-hook-form";
import { BmeFormController, BmeInput, BmeSelect } from "bme-ui";
import { useIntl } from "react-intl";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { WeightUnits } from "../../types/weight-units.type";

const Component = () => {
  const intl = useIntl();

  const {
    apiStatus,
    apiError,
    apiMessage,
    submit,
    resetForm,
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
