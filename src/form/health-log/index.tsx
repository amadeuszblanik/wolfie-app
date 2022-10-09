import React, { useEffect, useState } from "react";
import { DoggoBox, DoggoButton, DoggoForm, DoggoInput, DoggoSelect, DoggoText } from "../../ui-components";
import { InputTypes } from "../../ui-components/input";
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
  const [date, setDate] = useState("");
  const [medicines, setMedicines] = useState<string[]>([]);
  const [additionalMedicines, setAdditionalMedicines] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [nextVisit, setNextVisit] = useState("");
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
      <DoggoSelect
        label={intl.formatMessage({ id: "health_log.kind" })}
        value={kind}
        onChange={(nextValue) => setKind(nextValue as HealthLogKindTypes)}
        list={kindItems}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "health_log.date" })}
        value={date}
        onChange={setDate}
        type={InputTypes.Date}
        disabled={!formEnable}
        errors={formValidator.errors["date"]}
      />
      <ComponentSelectMedicines value={medicines} onChange={setMedicines} />
      <DoggoInput
        label={intl.formatMessage({ id: "health_log.additional_medicines" })}
        value={additionalMedicines.join(",")}
        onChange={(nextValue) => setAdditionalMedicines(nextValue.split(","))}
        type={InputTypes.Text}
        disabled={!formEnable}
        errors={formValidator.errors["additionalMedicines"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "health_log.diagnosis" })}
        value={diagnosis}
        onChange={setDiagnosis}
        type={InputTypes.Text}
        disabled={!formEnable}
        errors={formValidator.errors["diagnosis"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "health_log.next_visit" })}
        value={nextVisit}
        onChange={setNextVisit}
        type={InputTypes.DatetimeLocal}
        disabled={!formEnable}
        errors={formValidator.errors["nextVisit"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "health_log.veterinary" })}
        value={veterinary}
        onChange={setVeterinary}
        type={InputTypes.Text}
        disabled={!formEnable}
        errors={formValidator.errors["veterinary"]}
      />
      <DoggoInput
        label={intl.formatMessage({ id: "health_log.description" })}
        value={description}
        onChange={setDescription}
        type={InputTypes.Text}
        disabled={!formEnable}
        errors={formValidator.errors["description"]}
      />

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
