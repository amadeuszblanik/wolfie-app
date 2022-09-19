import { useEffect, useState } from "react";

const getDevice = (useragent: string): "iPhone" | "Android" | "macOS" | "Linux" | "Window" | "Other" => {
  if (useragent.includes("iPhone")) {
    return "iPhone";
  } else if (useragent.includes("Android")) {
    return "Android";
  } else if (useragent.includes("Macintosh")) {
    return "macOS";
  } else if (useragent.includes("Linux")) {
    return "Linux";
  } else if (useragent.includes("Windows")) {
    return "Window";
  } else {
    return "Other";
  }
};

const getBrowser = (useragent: string): "Chrome" | "Safari" | "Firefox" | "Edge" | "Other" => {
  if (useragent.includes("Chrome")) {
    return "Chrome";
  } else if (useragent.includes("Safari")) {
    return "Safari";
  } else if (useragent.includes("Firefox")) {
    return "Firefox";
  } else if (useragent.includes("Edge")) {
    return "Edge";
  } else {
    return "Other";
  }
};

const useDeviceNameHook = (): string => {
  const [userAgent, setUserAgent] = useState<string>("");

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, [navigator.userAgent]);

  return `${getDevice(userAgent)} ${getBrowser(userAgent)}`;
};

export default useDeviceNameHook;
