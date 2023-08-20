import { Controller } from "react-hook-form";
import { BmeCheckbox, BmeFormController, BmeInput, BmeInputDate, BmeSelect } from "bme-ui";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { WeightUnits } from "../../types/weight-units.type";

const Component = () => {
  const router = useRouter();
  const intl = useIntl();

  const { apiStatus, apiError, apiMessage, submit, resetForm, control, handleSubmit, errors } = useLogic();

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  const handleCloseModal = (success: boolean) => {
    if (!success) {
      return;
    }

    resetForm();
    void router.push("/auth/sign-in");
  };

  return (
    <Form
      onSubmit={onSubmit}
      apiStatus={apiStatus}
      error={apiError}
      success={apiMessage}
      onCloseModal={handleCloseModal}
    >
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
        name="birthDate"
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
      <Controller
        name="acceptedGdpr"
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
