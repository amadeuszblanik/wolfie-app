import React from "react";
import { DoggoText } from "../index";
import styled from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../text";

export interface ListProps {
  items: string[];
  textVariant?: DoggoTextVariant;
}

const StyledUl = styled.ul`
  width: 100%;
`;

const StyledLi = styled.li`
  padding: ${Sizes[SizesEnum.Small]}px ${Sizes[SizesEnum.Medium]}px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};

  &:last-child {
    border-bottom: none;
  }
`;

const List: React.FunctionComponent<ListProps> = ({ items, textVariant }) => (
  <StyledUl>
    {items.map((item, index) => (
      <StyledLi key={index}>
        <DoggoText variant={textVariant}>{item}</DoggoText>
      </StyledLi>
    ))}
  </StyledUl>
);

export default List;
