import React from "react";
import { useIntl } from "react-intl";
import { DoggoSelect } from "../../ui-components";
import { ListItem } from "../../types/list-item.types";
import { useGetBreed } from "../../api/queries";

interface Props {
  value?: number;
  onChange: (selectedMedicines: number | undefined) => void;
}

const Component: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const intl = useIntl();
  const { response } = useGetBreed();

  const breeds: ListItem[] =
    response?.map(({ name, id }) => ({ id: String(id), label: intl.formatMessage({ id: `pet.breed.${name}` }) })) || [];

  const handleChange = (id: string | undefined) => {
    onChange(Number(id) || undefined);
  };

  return <DoggoSelect value={String(value)} onChange={handleChange} list={breeds} nullable />;
};
export default Component;
