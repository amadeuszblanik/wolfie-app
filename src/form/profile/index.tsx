import { BmeBox, BmeButton, BmeDropdown, BmeInput, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useLayoutEffect, useState } from "react";
import { DropdownItem } from "bme-ui/dist/cjs/types/atoms/dropdown/types";
import { DefaultTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "../../components";
import { WeightUnits } from "../../types/weight-units.type";
import {
  profileActions,
  selectProfileData,
  selectProfilePutError,
  selectProfilePutStatus,
} from "../../store/profile.slice";

const Component = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeProfilePutStatus = useAppSelector(selectProfilePutStatus);
  const storeProfilePutError = useAppSelector(selectProfilePutError);
  const storeProfileData = useAppSelector(selectProfileData);

  const isError = storeProfilePutStatus === "error";

  const weightUnitsList: DropdownItem[] = Object.values(WeightUnits).map((weightUnit) => ({
    key: weightUnit,
    label: intl.formatMessage({ id: `common.form.weight_unit.value.${weightUnit.toLowerCase()}` }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weightUnit, setWeightUnit] = useState<DropdownItem | null>(
    weightUnitsList.find((item) => item.key === WeightUnits.Kilogram) || null,
  );

  useEffect(() => {
    dispatch(profileActions.resetPut());
    setIsModalOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (storeProfilePutError) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (storeProfilePutStatus === "success") {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [storeProfilePutError, storeProfilePutStatus]);

  useLayoutEffect(() => {
    if (!storeProfileData) {
      setFirstName("");
      setLastName("");
      setWeightUnit(weightUnitsList.find((item) => item.key === WeightUnits.Kilogram) || null);

      return;
    }

    setFirstName(storeProfileData.firstName);
    setLastName(storeProfileData.lastName);
    setWeightUnit(weightUnitsList.find((item) => item.key === storeProfileData.weightUnit) || null);
  }, [storeProfileData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      profileActions.put({
        firstName,
        lastName,
        weightUnit: weightUnit?.key || WeightUnits.Kilogram,
      }),
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      apiStatus={storeProfilePutStatus}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? storeProfilePutError || intl.formatMessage({ id: "common.form.profile.error" })
              : intl.formatMessage({ id: "common.form.profile.success" })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="firstName"
            value={firstName}
            label={intl.formatMessage({ id: "common.form.first_name.label" })}
            onValue={setFirstName}
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeInput
            name="lastName"
            value={lastName}
            label={intl.formatMessage({ id: "common.form.last_name.label" })}
            onValue={setLastName}
            width="100%"
          />
        </BmeBox>
        <BmeBox width="100%" margin="no|no|sm">
          <BmeDropdown
            name="weightUnit"
            label={intl.formatMessage({ id: "common.form.weight_unit.label" })}
            list={weightUnitsList}
            value={weightUnit}
            onValue={setWeightUnit}
            width="100%"
          />
        </BmeBox>
        <BmeBox margin="no|no|lg">
          <BmeButton type="submit">
            <FormattedMessage id="common.form.submit.label" />
          </BmeButton>
        </BmeBox>
      </BmeBox>
    </Form>
  );
};

export default Component;
