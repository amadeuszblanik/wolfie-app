import type React from "react";
import Text from "../text";
import styled, { ThemePalette } from "styled-components";
import { backgroundMixin, paddingMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Button, { ButtonSizes } from "../button";
import Icon from "../icon";
import Box from "../box";

interface StyledPillProps {
  variant: ThemePalette | ThemePalette[];
}

interface Props {
  label: string;
  variant?: ThemePalette | ThemePalette[];
  onRemove?: () => void;
}

const StyledPill = styled.div<StyledPillProps>`
  display: inline-flex;
  align-items: center;
  ${({ variant }) => backgroundMixin(variant)};
  ${paddingMixin({ top: SizesEnum.Medium, right: SizesEnum.Large, bottom: SizesEnum.Medium, left: SizesEnum.Large2 })};
  border-radius: 100px;
`;

const Component = ({ label, variant, onRemove }: Props) => {
  return (
    <StyledPill variant={variant || "primary"}>
      <Text noBottomMargin>{label}</Text>
      <Box padding={{ left: SizesEnum.Medium }}>
        <Button onClick={onRemove} size={ButtonSizes.Small}>
          <Icon icon="close" />
        </Button>
      </Box>
    </StyledPill>
  );
};

export default Component;
