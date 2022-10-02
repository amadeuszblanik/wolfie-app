/* eslint-disable no-magic-numbers */
import { useEffect, useState } from "react";

const useBase64ToFile = () => {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [result, setResult] = useState<File | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [originalFileName, setFileName] = useState("file");

  useEffect(() => {
    if (!dataUrl) {
      setResult(null);
      setError(["Provided file is empty"]);
      return;
    }

    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], originalFileName, { type: mimeString });
    setResult(file);
  }, [dataUrl, originalFileName]);

  return { result, error, setDataUrl, setFileName };
};

export default useBase64ToFile;
