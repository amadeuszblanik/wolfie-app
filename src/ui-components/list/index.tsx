import React from "react";
import styled from "styled-components";
import { SizesEnum } from "../../settings/sizes";
import Text, { DoggoTextVariant } from "../text";
import { backgroundMixin, paddingMixin } from "../mixins";
import Box from "../box";
import Item, { ItemProps } from "./item";

export interface Props {
  label?: string;
  children: React.ReactNode;
}

const StyledListWrapper = styled.div`
  width: 100%;
`;

const StyledUl = styled.ul`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Medium, y: SizesEnum.Small })};
  ${backgroundMixin("gray6")};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Component: React.FunctionComponent<Props> & { Item: React.FunctionComponent<ItemProps> } = ({
  label,
  children,
}) => (
  <StyledListWrapper>
    {label && (
      <Box padding={{ bottom: SizesEnum.Medium, x: SizesEnum.Large }}>
        <Text variant={DoggoTextVariant.Caption1}>{label}</Text>
      </Box>
    )}
    <StyledUl>{children}</StyledUl>
  </StyledListWrapper>
);

Component.Item = Item;

export default Component;
