import React from "react";
import styled from "styled-components";
import { isEmpty } from "bme-utils";
import Box, { BoxWidth, FlexAlign } from "../box";
import Text, { DoggoTextVariant } from "../text";
import { SizesEnum } from "../../settings/sizes";
import { DoggoBox, DoggoText } from "../index";

interface Props {
  label: string;
  hint?: string;
  errors?: string[];
  children: React.ReactNode;
  suffix?: React.ReactNode;
}

const StyledLabel = styled.label``;

const StyledFormControlWrapper = styled(Box)`
  --placeholder-width: 100%;
  --placeholder-height: 32px;
`;

const Component: React.FunctionComponent<Props> = ({ label, hint, errors, children, suffix }) => (
  <StyledFormControlWrapper width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }} column>
    <Box width={BoxWidth.Full} padding={{ bottom: SizesEnum.Medium }}>
      <StyledLabel>
        <Text variant={DoggoTextVariant.Callout}>{label}</Text>
      </StyledLabel>
    </Box>
    <Box width={BoxWidth.Full} alignY={FlexAlign.Center}>
      {children}
      {suffix && (
        <DoggoBox padding={{ left: SizesEnum.Small }}>
          <DoggoText noBottomMargin>{suffix}</DoggoText>
        </DoggoBox>
      )}
    </Box>
    {!isEmpty(hint) && (
      <Box width={BoxWidth.Full} padding={{ top: SizesEnum.Medium }}>
        <Text variant={DoggoTextVariant.Caption2}>{hint}</Text>
      </Box>
    )}
    {!isEmpty(errors) && (
      <Box width={BoxWidth.Full} padding={{ top: SizesEnum.Medium }}>
        <Text variant={DoggoTextVariant.Caption2} color="red">
          {errors?.join(", ")}
        </Text>
      </Box>
    )}
  </StyledFormControlWrapper>
);

Component.displayName = "DoggoUI_FormControl";

Component.defaultProps = {};

export default Component;
