import { BmeBox, BmeButton } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { SelectItem } from "bme-ui/dist/atoms/select/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormBuilder } from "../../components";
import { Link } from "../../atoms";
import { WeightUnits } from "../../types/weight-units.type";
import { selectSignUpError, selectSignUpMessage, selectSignUpStatus, signUpActions } from "../../store/sign-up.slice";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeSignUpStatus = useAppSelector(selectSignUpStatus);
  // @TODO Add message to form builder
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const storeSignUpMessage = useAppSelector(selectSignUpMessage);
  const storeSignUpError = useAppSelector(selectSignUpError);

  const weightUnitsList: SelectItem[] = Object.values(WeightUnits).map((weightUnit) => ({
    key: weightUnit,
    label: intl.formatMessage({ id: `common.form.weight_unit.value.${weightUnit.toLowerCase()}` }),
  }));

  return (
    <>
      <BmeBox alignX="center" width="100%" margin="md|no">
        <FormBuilder
          apiStatus={storeSignUpStatus}
          apiError={storeSignUpError}
          onErrorClose={() => {
            dispatch(signUpActions.resetForm());
          }}
          controls={[
            {
              type: "email",
              name: "email",
              label: intl.formatMessage({ id: "common.form.email.label" }),
              validators: ["required", "email"],
            },
            {
              type: "text",
              name: "firstName",
              label: intl.formatMessage({ id: "common.form.first_name.label" }),
              validators: ["required"],
            },
            {
              type: "text",
              name: "lastName",
              label: intl.formatMessage({ id: "common.form.last_name.label" }),
              validators: ["required"],
            },
            {
              type: "password",
              name: "password",
              label: intl.formatMessage({ id: "common.form.password.label" }),
              validators: ["required", "password"],
            },
            {
              type: "password",
              name: "passwordConfirm",
              label: intl.formatMessage({ id: "common.form.password_confirm.label" }),
              validators: ["required", "password"],
            },
            {
              type: "select",
              name: "weightUnit",
              label: intl.formatMessage({ id: "common.form.weight_unit.label" }),
              validators: ["required"],
              options: weightUnitsList,
            },
            {
              type: "checkbox",
              name: "gdprConsent",
              label: intl.formatMessage({ id: "common.form.gdpr_consent.label" }),
              validators: ["required"],
            },
          ]}
          onSubmit={(values) => {
            dispatch(
              signUpActions.signUp({
                email: String(values.email),
                firstName: String(values.firstName),
                lastName: String(values.lastName),
                password: String(values.password),
                passwordConfirm: String(values.passwordConfirm),
                weightUnit: String(values.weightUnit),
                gdprConsent: values.gdprConsent === "true",
              }),
            );
          }}
        >
          <Link href="/auth/sign-in">
            <BmeButton size="small" variant="background">
              <FormattedMessage id="common.form.sign_in.label" />
            </BmeButton>
          </Link>
          <Link href="/privacy-policy">
            <BmeButton size="small" variant="background">
              <FormattedMessage id="common.form.read_gdpr.label" />
            </BmeButton>
          </Link>
        </FormBuilder>
      </BmeBox>
    </>
  );
};

export default Component;
