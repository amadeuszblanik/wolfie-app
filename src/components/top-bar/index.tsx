import React, { createRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { BmeBox, BmeButton, BmeIcon } from "bme-ui";
import { bmeMixins } from "bme-ui";
import Item, { TopBarItemType } from "./item";
import { useMobile, useResizeObserver } from "../../hooks";
import { Container } from "../../atoms";

const DEFAULT_TOP_BAR_HEIGHT = 80;
const REDUCE_START_TOP_BAR_HEIGHT = 0;

interface TopBarProps {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
}

interface StyledTopBarDrawerProps {
  isOpen: boolean;
}
interface StyledTopBarPlaceholderProps {
  height: number;
}

type ComponentType = React.FC<TopBarProps> & { Item: TopBarItemType };

const StyledTopBarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1005;
  min-height: 80px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
`;

const StyledTopBarDrawer = styled.div<StyledTopBarDrawerProps>`
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? "60px" : "0")};
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? "calc(100vh - 60px)" : "0")};
  padding: ${({ isOpen }) => (isOpen ? "16px" : "0")} 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ isOpen }) => (isOpen ? "1px" : "0")} solid ${({ theme }) => theme.colors.gray6};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  ${bmeMixins.animations(["top", "max-height", "padding", "border-bottom", "opacity"])};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    display: none;
  }
`;

const StyledTopBarPlaceholder = styled.div<StyledTopBarPlaceholderProps>`
  height: ${({ height }) => height}px;
  ${bmeMixins.animations(["height"])};
`;
const Component: ComponentType = ({ left, right, children }) => {
  const isMobile = useMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState(DEFAULT_TOP_BAR_HEIGHT);
  const topBarRef = createRef<HTMLDivElement>();

  useResizeObserver(topBarRef, (entry) => {
    setTopBarHeight(entry.map((e) => e.contentRect.height).reduce((a, b) => a + b, REDUCE_START_TOP_BAR_HEIGHT));
  });

  useLayoutEffect(() => {
    setTopBarHeight(topBarRef.current?.clientHeight || DEFAULT_TOP_BAR_HEIGHT);
  }, [topBarRef]);

  return (
    <>
      <StyledTopBarWrapper ref={topBarRef}>
        <Container>
          <BmeBox alignY="center" margin="md|sm">
            <BmeBox margin="no|sm|no|no">{left}</BmeBox>
            {!isMobile && (
              <>
                <BmeBox alignY="center" margin="no|auto|no|no">
                  {children}
                </BmeBox>
              </>
            )}
            <BmeBox alignY="center" margin="no|no|no|auto">
              {isMobile ? (
                <BmeButton size="small" variant="backgroundSecondary" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                  <BmeIcon name="menu" />
                </BmeButton>
              ) : (
                right
              )}
            </BmeBox>
          </BmeBox>
        </Container>
      </StyledTopBarWrapper>
      {isMobile && (
        <StyledTopBarDrawer isOpen={isDrawerOpen}>
          <Container>
            {children}
            <BmeBox margin="md|no|no">{right}</BmeBox>
          </Container>
        </StyledTopBarDrawer>
      )}
      <StyledTopBarPlaceholder height={topBarHeight} />
    </>
  );
};

Component.Item = Item;

export default Component;
