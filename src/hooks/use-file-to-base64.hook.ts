import { useEffect, useState } from "react";
import { compareObjects } from "bme-utils";
import { Base64File } from "../types/base-64-file.types";

const useFileToBase64 = (fileList: FileList | null): Base64File[] => {
  const [base64List, setBase64List] = useState<Base64File[]>([]);
  const [prevFileList, setPrevFileList] = useState<FileList | null>(null);

  const handleReaderLoad = (reader: FileReader, name: string, index: number) => () => {
    const base64 = reader.result;
    setBase64List((prev) => {
      const newList = [...prev];
      newList[index] = { uri: base64 as string, name };
      return newList;
    });
  };

  useEffect(() => {
    if (compareObjects(fileList, prevFileList)) {
      return;
    }

    if (!fileList) {
      setBase64List([]);

      return;
    }

    Array.from(fileList).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = handleReaderLoad(reader, file.name, index);
      reader.readAsDataURL(file);
    });

    setPrevFileList(fileList);
  }, [fileList]);

  return base64List;
};

export default useFileToBase64;
