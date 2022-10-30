import React, { useCallback } from "react";
import { ComponentRemoveEntry } from "../component";
import deletePetWeightSingleById from "../api/queries/delete-pet-weight-single-by-id";

interface Props {
  petId: string;
  weightId: string;
  entry: string;
  onClose: () => void;
}

const DeleteEntry: React.FunctionComponent<Props> = ({ petId, weightId, entry, onClose }) => {
  const { error, status, remove } = deletePetWeightSingleById(petId);

  const handleRemove = useCallback(() => {
    remove(weightId);
    onClose();
  }, [remove, weightId, onClose]);

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
