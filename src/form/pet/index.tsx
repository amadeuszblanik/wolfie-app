import { Controller } from "react-hook-form";
import { BmeCheckbox, BmeFormController, BmeInput, BmeInputDate, BmeSelect } from "bme-ui";
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
    breedsList,
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
        name="breed"
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
            <BmeSelect {...field} searchable>
              {breedsList.map((breed) => (
                <BmeSelect.Option
                  key={breed.key}
                  value={breed.key}
                  label={breed.label}
                  selected={field.value === breed.key}
                />
              ))}
            </BmeSelect>
          </BmeFormController>
        )}
      />
      <Controller
        name="pureBreed"
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
        name="microchip"
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
        name="neutered"
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
      <Controller
        name="instagram"
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
