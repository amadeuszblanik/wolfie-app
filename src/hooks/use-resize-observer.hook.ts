import React, { useEffect, useRef } from "react";

const useHook = <T extends HTMLElement>(element: React.RefObject<T> | null, onResize: ResizeObserverCallback) => {
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!element?.current) {
      return;
    }

    observer.current = new ResizeObserver(onResize);
    observer.current?.observe(element.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [element, onResize]);
};

export default useHook;
