/* eslint-disable no-magic-numbers */
import { useEffect, useState } from "react";
import { compareObjects, isEmpty } from "bme-utils";
import { Base64File } from "../types/base-64-file.types";

const useBase64ToFile = (dataUri: Base64File[]): File[] => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [prevDataUri, setPrevDataUri] = useState<Base64File[]>([]);

  useEffect(() => {
    if (compareObjects(dataUri, prevDataUri)) {
      return;
    }

    if (!dataUri || isEmpty(dataUri)) {
      setFileList([]);

      return;
    }

    const files = dataUri.map(({ uri, name }) => {
      const byteString = atob(uri.split(",")[1]);
      const mimeString = uri.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const fileExtension = mimeString.split("/")[1];
      const nameWithoutExtension = name.split(".")[0];

      return new File([blob], `${nameWithoutExtension}.${fileExtension}`, { type: mimeString });
    });

    setFileList(files);

    setPrevDataUri(dataUri);
  }, [dataUri]);

  return fileList;
};

export default useBase64ToFile;
