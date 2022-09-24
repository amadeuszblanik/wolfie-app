import React from "react";

interface Props {
  children: React.ReactNode;
}

const Component: React.FunctionComponent<Props> = ({ children }) => {
  return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>;
};

export default Component;
