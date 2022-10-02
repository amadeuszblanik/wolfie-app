import { useCallback, useEffect, useState } from "react";

// eslint-disable-next-line prettier/prettier
const useFileToBase64 = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [resultsFailed, setResultsFailed] = useState<string[]>([]);

  const handleLoad = useCallback(
    (event: ProgressEvent<FileReader>) => {
      const { result } = event.target as FileReader;

      const nextResults = [...results, result as string];
      setResults(nextResults);
    },
    [results],
  );

  const handleError = useCallback(
    (event: ProgressEvent<FileReader>) => {
      const nextResultsFailed = [...resultsFailed, event.target?.error?.message as string];
      setResultsFailed(nextResultsFailed);
    },
    [resultsFailed],
  );

  useEffect(() => {
    if (!fileList) {
      setResults([]);
      return;
    }

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", handleLoad);
      reader.addEventListener("error", handleError);

      reader.readAsDataURL(file);

      return () => {
        reader.removeEventListener("load", handleLoad);
        reader.removeEventListener("error", handleError);
      };
    });
  }, [fileList, handleLoad, handleError]);

  return { results, setFileList, setResultsFailed };
};

export default useFileToBase64;
