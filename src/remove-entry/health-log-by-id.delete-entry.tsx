import React, { useCallback } from "react";
import { ComponentRemoveEntry } from "../component";
import { useDeleteHealthLog } from "../api/queries";

interface Props {
  petId: string;
  entryId: string;
  entry: string;
  onClose: () => void;
}

const DeleteEntry: React.FunctionComponent<Props> = ({ petId, entryId, entry, onClose }) => {
  const { error, status, request } = useDeleteHealthLog(petId, entryId);

  const handleRemove = useCallback(() => {
    request(petId, entryId);
    onClose();
  }, [request, petId, entryId, onClose]);

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
