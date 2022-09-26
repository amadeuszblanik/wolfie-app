import { SizesEnum } from "../../settings/sizes";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { sizeMixin } from "../../ui-components/mixins";

const DEFAULT_MOBILE_GRID = 2;
const DEFAULT_DESKTOP_GRID = 3;

export enum GridAlign {
  Left = "start",
  Right = "end",
  Center = "center",
  Top = "start",
  Bottom = "end",
}

interface StyledGridProps {
  mobile: number;
  desktop: number;
  alignX?: GridAlign;
  alignY?: GridAlign;
}

type Props = {
  children: React.ReactNode;
  mobile?: number;
  desktop?: number;
  onSizeChange?: (size: { width: number; height: number }) => void;
  alignX?: GridAlign;
  alignY?: GridAlign;
};

const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  grid-gap: ${sizeMixin(SizesEnum.Large)};
  grid-template-columns: repeat(${({ mobile }) => mobile}, 1fr);
  margin: 0 auto;

  & > * {
    align-self: ${({ alignY }) => alignY};
    justify-self: ${({ alignX }) => alignX};
  }

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(${({ desktop }) => desktop}, 1fr);
  }
`;

const Component: React.FunctionComponent<Props> = ({ children, mobile, desktop, onSizeChange, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window || !onSizeChange) {
      return;
    }

    const handleResize = () => {
      const { width, height } = ref.current?.getBoundingClientRect() || { width: 0, height: 0 };
      onSizeChange({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onSizeChange]);

  return (
    <StyledGrid ref={ref} mobile={mobile ?? DEFAULT_MOBILE_GRID} desktop={desktop ?? DEFAULT_DESKTOP_GRID} {...props}>
      {children}
    </StyledGrid>
  );
};

export default Component;
