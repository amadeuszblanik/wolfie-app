import React from "react";
import styled from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Text, { DoggoTextVariant } from "../text";
import { backgroundMixin, paddingMixin } from "../mixins";
import Box, { FlexAlign } from "../box";

export interface ListProps {
  label?: string;
  items: string[] | string[][];
  textVariant?: DoggoTextVariant;
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

const StyledLi = styled.li`
  padding: ${Sizes[SizesEnum.Small]}px ${Sizes[SizesEnum.Medium]}px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray5};

  &:last-child {
    border-bottom: none;
  }
`;

const List: React.FunctionComponent<ListProps> = ({ label, items, textVariant }) => (
  <StyledListWrapper>
    {label && (
      <Box padding={{ bottom: SizesEnum.Medium, x: SizesEnum.Large2 }}>
        <Text variant={DoggoTextVariant.Caption1}>{label}</Text>
      </Box>
    )}
    <StyledUl>
      {items.map((subItems, index) => (
        <StyledLi key={index}>
          {subItems instanceof Array ? (
            <Box alignX={FlexAlign.SpaceBetween}>
              {subItems.map((subItem, subItemIndex) => (
                <Text variant={textVariant} key={subItemIndex} color={!subItemIndex ? "text" : "gray2"}>
                  {subItem}
                </Text>
              ))}
            </Box>
          ) : (
            <Text variant={textVariant}>{subItems}</Text>
          )}
        </StyledLi>
      ))}
    </StyledUl>
  </StyledListWrapper>
);

export default List;
