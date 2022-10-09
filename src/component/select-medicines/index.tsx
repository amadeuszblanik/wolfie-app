import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { DoggoAutocomplete, DoggoBox, DoggoPill } from "../../ui-components";

import { ListItem } from "../../types/list-item.types";
import { uniqueArray } from "../../utils";
import { SizesEnum } from "../../settings/sizes";
import useMedicineShortList from "../../api/queries/medicine-short-list";

interface Props {
  value?: string[];
  onChange: (selectedMedicines: string[]) => void;
}

const Component: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const intl = useIntl();

  const [selectedMedicines, setSelectedMedicines] = useState<string[]>(value || []);

  const { response } = useMedicineShortList();

  const medicines: ListItem[] = response?.map(({ name, productNumber }) => ({ id: productNumber, label: name })) || [];

  const handleAdd = (id: string | undefined) => {
    if (!id) {
      return;
    }

    const nextSelectedMedicines = [...selectedMedicines];
    nextSelectedMedicines.push(medicines.find(({ id: medicineId }) => medicineId === id)!.id);
    setSelectedMedicines(uniqueArray(nextSelectedMedicines));
  };
  const handleRemove = (id: string) => {
    let nextSelectedMedicines = [...selectedMedicines];
    nextSelectedMedicines = nextSelectedMedicines.filter((selectedMedicine) => selectedMedicine !== id);
    setSelectedMedicines(nextSelectedMedicines);
  };

  const getMedicineById = (id: string): ListItem | undefined => {
    return medicines.find(({ id: medicineId }) => medicineId === id);
  };

  useEffect(() => {
    onChange(selectedMedicines);
  }, [selectedMedicines]);

  return (
    <DoggoBox column>
      <DoggoAutocomplete
        label={intl.formatMessage({ id: "component.selected_medicines.label" })}
        onChange={handleAdd}
        list={medicines}
      ></DoggoAutocomplete>
      <DoggoBox>
        {selectedMedicines.map((medicine) => (
          <DoggoBox key={medicine} padding={{ right: SizesEnum.Small }}>
            <DoggoPill
              label={getMedicineById(medicine)?.label || medicine}
              onRemove={() => handleRemove(medicine)}
              variant="blue"
            />
          </DoggoBox>
        ))}
      </DoggoBox>
    </DoggoBox>
  );
};
export default Component;
