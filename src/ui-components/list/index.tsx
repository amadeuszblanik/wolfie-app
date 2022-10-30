import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { isEmpty } from "bme-utils";
import Item, { ItemProps } from "./item";
import { SizesEnum } from "../../settings/sizes";
import Text, { DoggoTextVariant, TextAlignment } from "../text";
import { backgroundMixin, paddingMixin } from "../mixins";
import Box, { BoxWidth, FlexAlign } from "../box";

export interface Props {
  label?: string;
  children: React.ReactNode;
  emptyMessage?: string | React.ReactNode;
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
  emptyMessage,
}) => {
  const isEmptyList =
    isEmpty(React.Children.count(children)) ||
    (Array.isArray(children) && children.every((child) => isEmpty(child) || child === false));

  return (
    <StyledListWrapper>
      {label && (
        <Box padding={{ bottom: SizesEnum.Medium, x: SizesEnum.Large }}>
          <Text variant={DoggoTextVariant.Caption1}>{label}</Text>
        </Box>
      )}
      <StyledUl>
        {!isEmptyList ? (
          children
        ) : (
          <Box alignX={FlexAlign.Center} width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }}>
            <Text align={TextAlignment.Center}>{emptyMessage ?? <FormattedMessage id="component.list.empty" />}</Text>
          </Box>
        )}
      </StyledUl>
    </StyledListWrapper>
  );
};

Component.Item = Item;

export default Component;
