import { useEffect, useState } from "react";
import { theme } from "../settings";

const useHook = (): boolean => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updateIsMobile = () => {
      const isDesktop = matchMedia(`(min-width: ${theme.breakpoints.desktop}px)`).matches;

      setIsMobile(!isDesktop);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  return isMobile;
};

export default useHook;
