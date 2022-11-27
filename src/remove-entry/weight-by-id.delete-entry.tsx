import React, { useCallback } from "react";
import { ComponentRemoveEntry } from "../component";
import { useDeletePetWeightSingleById } from "../api/queries";

interface Props {
  petId: string;
  entryId: string;
  entry: string;
  onClose: () => void;
}

const DeleteEntry: React.FunctionComponent<Props> = ({ petId, entryId, entry, onClose }) => {
  const { error, status, remove } = useDeletePetWeightSingleById(petId);

  const handleRemove = useCallback(() => {
    remove(entryId);
    onClose();
  }, [remove, entryId, onClose]);

  return (
    <ComponentRemoveEntry
      entry={entry}
      status={status}
      error={error}
      onClose={onClose}
      onRemove={handleRemove}
    ></ComponentRemoveEntry>
  );
};

export default DeleteEntry;
