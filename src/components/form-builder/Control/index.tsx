import React from "react";
import { BmeBox } from "bme-ui";
import Text from "./text";
import { FormControlProps } from "./types";
import Checkbox from "./checkbox";

const Component: React.FC<FormControlProps> = (props) => {
  switch (props.type) {
    case "text":
      return <Text {...props} />;
    case "email":
      return <Text {...props} />;
    case "password":
      return <Text {...props} />;
    case "search":
      return <Text {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
  }

  return <BmeBox>Unknown</BmeBox>;
};

export default Component;
