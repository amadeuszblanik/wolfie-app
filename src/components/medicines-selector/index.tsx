import React, { useEffect, useState } from "react";
import { BmeBox, BmeFormController, BmeInput, BmeList, BmeText } from "bme-ui";
import { useIntl } from "react-intl";
import { isEmpty } from "bme-utils";
import { StyledDrawer, StyledDrawerContent, StyledDrawerItem } from "./styled";
import { useAppDispatch, useAppSelector, useClickOutside } from "../../hooks";
import { medicinesActions, selectMedicinesData } from "../../store/medicines.slice";

interface MedicinesSelectorProps {
  value: string[] | null;
  onChange: (value: string[]) => void;
  errorMessage?: Record<string, any>;
}

const Component: React.FC<MedicinesSelectorProps> = ({ value, onChange, errorMessage }) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const storeMedicinesData = useAppSelector(selectMedicinesData);

  const [valueToAdd, setValueToAdd] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const medicineListSelected = (value || []).map((name) => {
    const medicine = storeMedicinesData?.find(({ productNumber }) => productNumber === name);

    return (
      medicine || {
        name,
        productNumber: null,
      }
    );
  });

  const medicineListFiltered =
    storeMedicinesData?.filter(
      ({ name, productNumber }) =>
        name.toLowerCase().includes(valueToAdd.toLowerCase()) ||
        productNumber.toLowerCase().includes(valueToAdd.toLowerCase()),
    ) || [];

  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsDrawerOpen(false);
  });

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const addValue = (event: string) => {
    onChange([...(value || []), event]);
    setValueToAdd("");
  };

  const deleteValue = (event: string) => {
    onChange((value || []).filter((entry) => entry !== event));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addValue(valueToAdd);
    }
  };

  useEffect(() => {
    dispatch(medicinesActions.get());
  }, []);

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
          <BmeInput value={valueToAdd} onChange={setValueToAdd} onFocus={openDrawer} onKeyDown={handleKeyDown} />
          {isDrawerOpen && (
            <StyledDrawer>
              <StyledDrawerContent>
                {medicineListFiltered.map((medicine) => (
                  <StyledDrawerItem
                    key={medicine.productNumber}
                    onClick={() => addValue(medicine.productNumber)}
                    type="button"
                  >
                    {medicine.name}
                  </StyledDrawerItem>
                ))}
              </StyledDrawerContent>
            </StyledDrawer>
          )}
        </BmeBox>
      </BmeFormController>
      {!isEmpty(medicineListSelected) && (
        <BmeBox wrap width="100%">
          <BmeList label={intl.formatMessage({ id: "common.form.medicines.selected_medicines.label" })}>
            {medicineListSelected.map((medicine, index) => (
              <BmeList.Item
                key={index}
                actions={[
                  {
                    onClick: () => deleteValue(medicine.productNumber || medicine.name),
                    children: intl.formatMessage({ id: "common.delete" }),
                    variant: "red",
                  },
                ]}
              >
                <BmeText>{medicine.name}</BmeText>
                {medicine.productNumber && <BmeText>{medicine.productNumber}</BmeText>}
              </BmeList.Item>
            ))}
          </BmeList>
        </BmeBox>
      )}
    </BmeBox>
  );
};

export default Component;
