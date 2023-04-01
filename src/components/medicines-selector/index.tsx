import React, { useEffect, useState } from "react";
import { BmeBox, BmeFormController, BmeInput, BmeList, BmeText } from "bme-ui";
import { useIntl } from "react-intl";
import { compareObjects, isEmpty } from "bme-utils";
import { StyledDrawer, StyledDrawerContent, StyledDrawerItem } from "./styled";
import { useAppDispatch, useAppSelector, useClickOutside } from "../../hooks";
import { medicinesActions, selectMedicinesDataAsList } from "../../store/medicines.slice";

interface MedicineSelectorValue {
  medicines: string[];
  additionalMedicines: string[];
}

interface MedicinesSelectorProps {
  value: MedicineSelectorValue;
  onChange: (value: MedicineSelectorValue) => void;
  errorMessage?: Record<string, any>;
}

const INDEX_EMPTY = -1;
const VALUE_TO_DELETE = 1;

const Component: React.FC<MedicinesSelectorProps> = ({ value, onChange, errorMessage }) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const storeMedicinesDataAsList = useAppSelector(selectMedicinesDataAsList);

  const [valueToAdd, setValueToAdd] = useState<string>("");
  const [medicines, setMedicines] = useState<string[]>(value.medicines ?? []);
  const [additionalMedicines, setAdditionalMedicines] = useState<string[]>(value.additionalMedicines ?? []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!compareObjects(value, { medicines, additionalMedicines })) {
      setMedicines(value.medicines ?? []);
      setAdditionalMedicines(value.additionalMedicines ?? []);
    }
  }, [value]);

  const selectedMedicines = [
    ...medicines.map((medicine) => {
      const result = storeMedicinesDataAsList.find((item) => item.key === medicine);

      return result ? { key: result.key, label: result.label, type: "medicine" } : null;
    }),
    ...additionalMedicines.map((medicine) => ({ key: medicine, label: medicine, type: "additional" })),
  ].filter(Boolean) as unknown as { key: string; label: string; type: "medicine" | "additional" }[];

  const filteredMedicinesList = storeMedicinesDataAsList.filter((medicine) =>
    medicine.label.toLowerCase().includes(valueToAdd.toLowerCase()),
  );

  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsDrawerOpen(false);
  });

  useEffect(() => {
    dispatch(medicinesActions.get());
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleChangeMedicines = (changeValue: string | number) => {
    const nextValue = [...medicines];
    const valuesToSwitch = changeValue.toString().split(",");

    valuesToSwitch.forEach((valueToSwitch) => {
      const index = nextValue.indexOf(valueToSwitch);

      if (index > INDEX_EMPTY) {
        nextValue.splice(index, VALUE_TO_DELETE);
      } else {
        nextValue.push(valueToSwitch);
      }
    });

    setMedicines(nextValue);
  };

  useEffect(() => {
    onChange({ medicines, additionalMedicines });
  }, [medicines, additionalMedicines]);

  const handleValueToAddChange = (event: string) => {
    setValueToAdd(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setAdditionalMedicines([...additionalMedicines, ...valueToAdd.split(",").filter((key) => !isEmpty(key))]);
      setValueToAdd("");
    }
  };

  const handleDeleteMedicine = (type: "medicine" | "additional", medicine: string) => {
    switch (type) {
      case "medicine":
        setMedicines(medicines.filter((item) => item !== medicine));
        break;
      case "additional":
        setAdditionalMedicines(additionalMedicines.filter((item) => item !== medicine));
        break;
    }
  };

  return (
    <BmeBox innerRef={ref} position="relative" direction="column" width="100%" height="100%">
      <BmeFormController
        width="100%"
        label={intl.formatMessage({
          id: `common.form.medicines.label`,
        })}
        name="medicines"
        error={
          errorMessage
            ? Object.values(errorMessage)
                .map(({ message }) => message)
                .join(", ")
            : undefined
        }
        hint={intl.formatMessage({ id: "common.form.medicines.hint" })}
      >
        <BmeBox position="relative" width="100%">
          <BmeInput
            value={valueToAdd}
            onChange={handleValueToAddChange}
            onFocus={openDrawer}
            onKeyDown={handleKeyDown}
          />
          {isDrawerOpen && (
            <StyledDrawer>
              <StyledDrawerContent>
                {filteredMedicinesList.map((medicine) => (
                  <StyledDrawerItem
                    key={medicine.key}
                    onClick={() => handleChangeMedicines(medicine.key)}
                    type="button"
                  >
                    {medicine.label}
                  </StyledDrawerItem>
                ))}
              </StyledDrawerContent>
            </StyledDrawer>
          )}
        </BmeBox>
      </BmeFormController>
      {!isEmpty(selectedMedicines) && (
        <BmeBox wrap width="100%">
          <BmeList label={intl.formatMessage({ id: "common.form.medicines.selected_medicines.label" })}>
            {selectedMedicines.map((medicine, index) => (
              <BmeList.Item
                key={index}
                actions={[
                  {
                    onClick: () => handleDeleteMedicine(medicine.type, medicine.key),
                    children: intl.formatMessage({ id: "common.delete" }),
                    variant: "red",
                  },
                ]}
              >
                <BmeText>{medicine.label}</BmeText>
                {medicine.type === "medicine" && <BmeText>{medicine.key}</BmeText>}
              </BmeList.Item>
            ))}
          </BmeList>
        </BmeBox>
      )}
    </BmeBox>
  );
};

export default Component;
