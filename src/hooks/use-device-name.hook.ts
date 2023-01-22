import { useEffect, useState } from "react";
import { detectDevice } from "bme-utils";

const useHook = () => {
  const [deviceName, setDeviceName] = useState("Web client");

  useEffect(() => {
    const deviceInfo = detectDevice();

    setDeviceName(`${deviceInfo.os} ${deviceInfo.browser}`);
  }, [setDeviceName]);

  return deviceName;
};

export default useHook;
