import React from "react";
import styled from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Text, { DoggoTextVariant } from "../text";
import { backgroundMixin, paddingMixin } from "../mixins";
import Box, { BoxWidth, FlexAlign } from "../box";
import { getIndexes, isText } from "../../utils";

type ListItem = string | React.ReactNode;

const FIRST_INDEX = 0;

export interface ListProps {
  label?: string;
  items: ListItem[] | ListItem[][];
  textVariant?: DoggoTextVariant;
}

export interface ListCellProps {
  children: ListItem | ListItem[];
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

const ListCell: React.FunctionComponent<ListCellProps> = ({ children, textVariant }) =>
  isText(children) ? (
    <Text variant={textVariant} color={!children ? "text" : "gray2"}>
      {children}
    </Text>
  ) : (
    <>children</>
  );
const List: React.FunctionComponent<ListProps> = ({ label, items, textVariant }) => {
  const flexAlignX = (index: number, subItemList: ListItem[]): FlexAlign => {
    if (index <= FIRST_INDEX) {
      return FlexAlign.Left;
    }

    if (index >= getIndexes(subItemList)) {
      return FlexAlign.Right;
    }

    return FlexAlign.Center;
  };

  return (
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
                  <Box
                    key={subItemIndex}
                    width={BoxWidth.Full}
                    alignX={flexAlignX(subItemIndex, subItems)}
                    padding={{ x: SizesEnum.Medium }}
                  >
                    <ListCell textVariant={textVariant}>{subItem}</ListCell>
                  </Box>
                ))}
              </Box>
            ) : (
              <ListCell textVariant={textVariant}>{subItems}</ListCell>
            )}
          </StyledLi>
        ))}
      </StyledUl>
    </StyledListWrapper>
  );
};

export default List;
