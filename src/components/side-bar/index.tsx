import React, { useState } from "react";
import styled from "styled-components";
import { BmeAvatar, BmeBox, BmeButton, BmeProgressBar, BmeText } from "bme-ui";
import { bmeMixins } from "bme-ui";
import { FormattedMessage } from "react-intl";
import Item, { SideBarItemType } from "./item";
import { Brand } from "../../atoms";

// @TODO: IN DEVELOPMENT
// @TODO: Add translations
// @TODO: Add button 100% width to bme-ui
// @TODO: Fix progress bar width to bme-ui
// @TODO: Add 3d animations to profile
// @TODO: Add isOpen props to StyledSideBarProfile
// @TODO: Add proper icons to bme-ui
// @TODO: Add top bar with title
// @TODO: Add custom width or paddings to container

interface TopBarProps {
  children: React.ReactNode;
}

interface StyledSideBarWrapperProps {
  isOpen: boolean;
}

type ComponentType = React.FC<TopBarProps> & { Item: SideBarItemType };

const StyledSideBarWrapper = styled.div<StyledSideBarWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  width: 80px;
  height: ${({ isOpen }) => (isOpen ? "100vh" : "80px")};
  min-height: 80px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  ${bmeMixins.animations(["height"])};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    height: 100vh;
  }
`;

const StyledSideBarTop = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  appearance: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    cursor: default;
  }
`;

const StyledSideBarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100% - 80px * 2);
  margin-bottom: auto;
`;

const StyledSideBarBottom = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-top: auto;
  background: ${({ theme }) => theme.colors.gray6};
  border: none;
  cursor: pointer;
  appearance: none;
`;

const StyledSideBarProfile = styled.div`
  position: fixed;
  bottom: 0;
  left: 80px;
  z-index: 1005;
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: calc(100vw - 80px);
  min-height: 300px;
  ${({ theme }) => bmeMixins.paddings("lg|md", theme)}
  background: ${({ theme }) => theme.colors.gray6};
`;

const Component: ComponentType = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // @TODO: const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <StyledSideBarWrapper isOpen={isDrawerOpen}>
        <StyledSideBarTop onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          <Brand withName={false} />
        </StyledSideBarTop>
        <StyledSideBarMenu>{children}</StyledSideBarMenu>
        <StyledSideBarBottom>
          <BmeAvatar rounded size="small" />
        </StyledSideBarBottom>
        <StyledSideBarProfile>
          <BmeBox alignY="top">
            <BmeBox margin="no|xs|no|no">
              <BmeText variant="Title2">Joe Doe</BmeText>
            </BmeBox>
            <BmeText>User+</BmeText>
          </BmeBox>
          <BmeBox direction="column" width="100%">
            <BmeBox margin="no|no|xs|no">
              <BmeText>
                <FormattedMessage
                  id="layout.app.profile.usage"
                  values={{
                    petsCount: 3,
                    petsLimit: 3,
                  }}
                />
              </BmeText>
            </BmeBox>
            <BmeProgressBar value={100} />
          </BmeBox>
          <BmeBox direction="column" alignY="bottom" margin="auto|no|no">
            <BmeBox padding="no|no|xs">
              <BmeButton size="small">
                <FormattedMessage id="layout.app.profile.settings" />
              </BmeButton>
            </BmeBox>
            <BmeBox padding="no|no|xs">
              <BmeButton size="small">
                <FormattedMessage id="layout.app.profile.profile" />
              </BmeButton>
            </BmeBox>
            <BmeButton size="small">
              <FormattedMessage id="layout.app.profile.sign_off" />
            </BmeButton>
          </BmeBox>
        </StyledSideBarProfile>
      </StyledSideBarWrapper>
    </>
  );
};

Component.Item = Item;

export default Component;
