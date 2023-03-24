import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BmeFormController, BmeInput, BmeInputDate, BmeSelect } from "bme-ui";
import { useIntl } from "react-intl";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FormData, formSchema } from "./type";
import useLogic from "./logic";
import { Form } from "../../components";
import { changeCase } from "../../utils";
import { ChangeCaseUtil } from "../../utils/change-case.util";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { breedsActions, selectBreedsDataList } from "../../store/breeds.slice";
import { petsActions, selectPets } from "../../store/pets.slice";

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;

  const storeBreedsDataList = useAppSelector(selectBreedsDataList);
  const storePets = useAppSelector(selectPets(petId || ""));

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const { apiStatus, apiError, apiMessage, submit, resetForm } = useLogic();

  useEffect(() => {
    dispatch(petsActions.petsMy());
    dispatch(breedsActions.get());
  }, []);

  useEffect(() => {
    if (storePets) {
      setValue("name", storePets.name);
      setValue("breed", storePets.breed?.id);
      setValue("birthDate", new Date("2022-02-12"));
    }
  }, [storePets]);

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  return (
    <Form onSubmit={onSubmit} apiStatus={apiStatus} error={apiError} success={apiMessage} onCloseModal={resetForm}>
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
              {storeBreedsDataList.map((breed) => (
                <BmeSelect.Option
                  key={breed.key}
                  value={breed.key}
                  label={intl.formatMessage({ id: `breed.${breed.label}` })}
                  selected={field.value === breed.key}
                />
              ))}
            </BmeSelect>
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
    </Form>
  );
};

export default Component;
