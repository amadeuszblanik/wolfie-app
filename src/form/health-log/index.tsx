import React, { useEffect, useState } from "react";
import {
  DoggoBox,
  DoggoButton,
  DoggoForm,
  DoggoFormControl,
  DoggoInputDate,
  DoggoInputDatetime,
  DoggoInputText,
  DoggoInputTextarea,
  DoggoSelect,
  DoggoText,
} from "../../ui-components";
import { FormattedMessage, useIntl } from "react-intl";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { ApiStatesTypes } from "../../types/api-states.types";
import { SizesEnum } from "../../settings/sizes";
import useFormValidator, { FormValidators } from "../../form-validator";
import { useRouter } from "next/router";
import useSignIn from "../../api/queries/sign-in";
import { ComponentSelectMedicines } from "../../component";
import { ListItem } from "../../types/list-item.types";
import { HealthLogKindTypes } from "../../types/healt-log-kind.types";
import { DEFAULT_LONG_VARCHAR_LENGTH } from "../../settings/globals";
import { isEmpty } from "bme-utils";

const Form: React.FunctionComponent = () => {
  const intl = useIntl();
  const router = useRouter();
  const { post, status, response, error } = useSignIn();

  const kindItems: ListItem[] = Object.entries(HealthLogKindTypes).map(([key, value]) => ({
    id: key,
    label: intl.formatMessage({ id: `health-log.kind.${value}` }),
  }));

  const [formEnable, setFormEnable] = useState(true);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [kind, setKind] = useState<HealthLogKindTypes>(HealthLogKindTypes.Treatment);
  const [date, setDate] = useState<string>();
  const [medicines, setMedicines] = useState<string[]>([]);
  const [additionalMedicines, setAdditionalMedicines] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [nextVisit, setNextVisit] = useState<Date>();
  const [veterinary, setVeterinary] = useState("");
  const [description, setDescription] = useState("");

  const formValidator = useFormValidator([
    { name: "date", value: date, validator: [FormValidators.Required] },
    // { name: "medicines", value: medicines, validator: [FormValidators.Required] },
    // { name: "additionalMedicines", value: additionalMedicines, validator: [FormValidators.Required] },
    { name: "diagnosis", value: diagnosis, validator: [] },
    // { name: "nextVisit", value: nextVisit, validator: [] },
    { name: "veterinary", value: veterinary, validator: [] },
    { name: "description", value: description, validator: [] },
  ]);

  useEffect(() => {
    setSubmitEnable(formValidator.formValid);
  }, [formValidator.formValid]);

  useEffect(() => {
    if (response && status === ApiStatesTypes.Success) {
      void router.push("/app");
    }
  }, [response, status, router]);

  useEffect(() => {
    switch (status) {
      case ApiStatesTypes.Loading:
        setFormEnable(false);
        break;
      case ApiStatesTypes.Success:
        setFormEnable(false);
        break;
      default:
        setFormEnable(true);
    }
  }, [status]);

  const handleSubmit = () => {
    // post({
    //   username,
    //   password,
    //   keepSignIn,
    //   device,
    // });
  };

  return (
    <DoggoForm onSubmit={handleSubmit}>
      <DoggoFormControl label={intl.formatMessage({ id: "health_log.kind" })}>
        <DoggoSelect value={kind} onChange={(nextValue) => setKind(nextValue as HealthLogKindTypes)} list={kindItems} />
      </DoggoFormControl>
      <DoggoFormControl label={intl.formatMessage({ id: "health_log.date" })} errors={formValidator.errors["date"]}>
        <DoggoInputDate
          value={date}
          onChange={setDate}
          disabled={!formEnable}
          error={!isEmpty(formValidator.errors["date"])}
        />
      </DoggoFormControl>
      <ComponentSelectMedicines value={medicines} onChange={setMedicines} />
      <DoggoFormControl
        label={intl.formatMessage({ id: "health_log.additional_medicines" })}
        errors={formValidator.errors["additionalMedicines"]}
      >
        <DoggoInputText
          value={additionalMedicines.join(",")}
          onChange={(nextValue) => setAdditionalMedicines(nextValue.split(","))}
          disabled={!formEnable}
          error={!isEmpty(formValidator.errors["additionalMedicines"])}
        />
      </DoggoFormControl>
      <DoggoFormControl
        label={intl.formatMessage({ id: "health_log.diagnosis" })}
        errors={formValidator.errors["diagnosis"]}
      >
        <DoggoInputTextarea
          value={diagnosis}
          onChange={setDiagnosis}
          disabled={!formEnable}
          maxLength={DEFAULT_LONG_VARCHAR_LENGTH}
          error={!isEmpty(formValidator.errors["diagnosis"])}
        />
      </DoggoFormControl>
      <DoggoFormControl
        label={intl.formatMessage({ id: "health_log.next_visit" })}
        errors={formValidator.errors["nextVisit"]}
      >
        <DoggoInputDatetime
          value={nextVisit}
          onChange={setNextVisit}
          min={new Date()}
          disabled={!formEnable}
          error={!isEmpty(formValidator.errors["nextVisit"])}
        />
      </DoggoFormControl>
      <DoggoFormControl
        label={intl.formatMessage({ id: "health_log.veterinary" })}
        errors={formValidator.errors["veterinary"]}
      >
        <DoggoInputText
          value={veterinary}
          onChange={setVeterinary}
          disabled={!formEnable}
          error={!isEmpty(formValidator.errors["veterinary"])}
        />
      </DoggoFormControl>
      <DoggoFormControl
        label={intl.formatMessage({ id: "health_log.description" })}
        errors={formValidator.errors["description"]}
      >
        <DoggoInputTextarea
          value={description}
          onChange={setDescription}
          disabled={!formEnable}
          maxLength={DEFAULT_LONG_VARCHAR_LENGTH}
          error={!isEmpty(formValidator.errors["description"])}
        />
      </DoggoFormControl>

      <DoggoBox column>
        <DoggoBox
          width={BoxWidth.Full}
          alignX={FlexAlign.Right}
          alignY={FlexAlign.Center}
          padding={{ bottom: SizesEnum.Large }}
        >
          <DoggoButton variant="green" type="submit" disabled={!submitEnable}>
            <FormattedMessage id="common.add" />
          </DoggoButton>
        </DoggoBox>
        {error && (
          <DoggoBox>
            <DoggoText color="red">{error.message}</DoggoText>
          </DoggoBox>
        )}
      </DoggoBox>
    </DoggoForm>
  );
};

export default Form;
