import { SizesEnum } from "../../settings/sizes";
import React from "react";
import styled from "styled-components";
import { sizeMixin } from "../../ui-components/mixins";

const DEFAULT_MOBILE_GRID = 2;
const DEFAULT_DESKTOP_GRID = 3;

interface StyledGridProps {
  mobile: number;
  desktop: number;
}

type Props = {
  children: React.ReactNode;
  mobile?: number;
  desktop?: number;
};

const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: repeat(${({ mobile }) => mobile}, 1fr);
  grid-gap: ${sizeMixin(SizesEnum.Large)};
  margin: 0 auto;

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(${({ desktop }) => desktop}, 1fr);
  }
`;

const Component: React.FunctionComponent<Props> = ({ children, mobile, desktop }) => {
  return (
    <StyledGrid mobile={mobile ?? DEFAULT_MOBILE_GRID} desktop={desktop ?? DEFAULT_DESKTOP_GRID}>
      {children}
    </StyledGrid>
  );
};

export default Component;
