import { SizesEnum } from "../../settings/sizes";
import React from "react";
import styled from "styled-components";
import { sizeMixin } from "../../ui-components/mixins";

type Props = {
  children: React.ReactNode;
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${sizeMixin(SizesEnum.Large)};
  margin: 0 auto;

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Component: React.FunctionComponent<Props> = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>;
};

export default Component;
