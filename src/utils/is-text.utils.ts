import { isValidElement, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

const isTextUtils = (child: ReactNode): boolean => {
  switch (typeof child) {
    case "string":
      return true;
    case "number":
      return true;
    case "boolean":
      return false;
    case "undefined":
      return false;
    case "object":
      if (isValidElement(child)) {
        return child.type === FormattedMessage;
      }

      return false;
  }
};

export default isTextUtils;
