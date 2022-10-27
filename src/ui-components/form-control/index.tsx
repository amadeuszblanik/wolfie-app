import React from "react";
import styled from "styled-components";
import { isEmpty } from "bme-utils";
import Box, { BoxWidth } from "../box";
import Text, { DoggoTextVariant } from "../text";
import { SizesEnum } from "../../settings/sizes";

interface Props {
  label: string;
  hint?: string;
  errors?: string[];
  children: React.ReactNode;
}

const StyledLabel = styled.label``;

const Component: React.FunctionComponent<Props> = ({ label, hint, errors, children }) => (
  <Box width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }} column>
    <Box width={BoxWidth.Full} padding={{ bottom: SizesEnum.Medium }}>
      <StyledLabel>
        <Text variant={DoggoTextVariant.Callout}>{label}</Text>
      </StyledLabel>
    </Box>
    <Box width={BoxWidth.Full}>{children}</Box>
    {!isEmpty(hint) && (
      <Box width={BoxWidth.Full} padding={{ top: SizesEnum.Medium }}>
        <Text variant={DoggoTextVariant.Caption2}>{hint}</Text>
      </Box>
    )}
    {!isEmpty(errors) && (
      <Box width={BoxWidth.Full} padding={{ top: SizesEnum.Medium }}>
        <Text variant={DoggoTextVariant.Caption2} color="red">
          {errors?.join(",")}
        </Text>
      </Box>
    )}
  </Box>
);

Component.displayName = "DoggoUI/FormControl";

Component.defaultProps = {};

export default Component;
