import React, { useState } from "react";
import { BmeList, BmeText } from "bme-ui";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { pipeDate } from "../../pipes";
import { PetsPetIdWeightGetResponse } from "../../services/api/types/pets/:petId/weight/get/response.type";
import { RemoveEntryModal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  petsWeightActions,
  selectPetsWeightDeleteData,
  selectPetsWeightDeleteError,
  selectPetsWeightDeleteStatus,
} from "../../store/petsWeight.slice";

interface ListProps {
  weightUnit?: string;
  entries: PetsPetIdWeightGetResponse | null;
}

const List: React.FC<ListProps> = ({ weightUnit, entries }) => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const petId = String(router.query.petId);

  const storePetsWeightDeleteStatus = useAppSelector(selectPetsWeightDeleteStatus);
  const storePetsWeightDeleteError = useAppSelector(selectPetsWeightDeleteError);
  const storePetsWeightDeleteData = useAppSelector(selectPetsWeightDeleteData);

  const [entryToRemove, setEntryToRemove] = useState<string | null>(null);

  const handleRemoveEntry = () => {
    if (!entryToRemove) {
      return;
    }

    dispatch(petsWeightActions.remove({ petId, weightId: entryToRemove }));
    dispatch(petsWeightActions.get({ petId }));
  };

  return (
    <>
      <BmeList label={weightUnit || ""}>
        {entries?.map((item) => (
          <BmeList.Item
            key={item.id}
            actions={[
              {
                variant: "blue",
                onClick: () => router.push(`/app/pet/${petId}/weight/${item.id}`),
                children: intl.formatMessage({ id: "page.pet_weight.edit_entry" }),
              },
              {
                variant: "red",
                onClick: () => setEntryToRemove(item.id),
                children: intl.formatMessage({ id: "page.pet_weight.delete_entry" }),
              },
            ]}
          >
            <BmeText>{item.formatted}</BmeText>
            <BmeText>{pipeDate(item.date)}</BmeText>
          </BmeList.Item>
        ))}
      </BmeList>
      {entryToRemove && (
        <RemoveEntryModal
          apiStatus={storePetsWeightDeleteStatus}
          error={storePetsWeightDeleteError}
          success={storePetsWeightDeleteData}
          onCancel={() => setEntryToRemove(null)}
          onRemove={handleRemoveEntry}
        />
      )}
    </>
  );
};

export default List;
