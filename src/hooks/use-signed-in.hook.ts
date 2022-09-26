import { useEffect, useState } from "react";

const useSignedInHook = (): boolean => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    setSignedIn(!!accessToken && !!refreshToken);
  });

  return signedIn;
};

export default useSignedInHook;
