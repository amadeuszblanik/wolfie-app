import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BmeAvatar, BmeBox, BmeButton, BmeText } from "bme-ui";
import { bmeMixins } from "bme-ui";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Item, { SideBarItemType } from "./item";
import { Brand, Link } from "../../atoms";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { profileActions, selectProfileData } from "../../store/profile.slice";
import { limitActions, selectLimitData } from "../../store/limit.slice";

// @TODO: Redesign back button

interface TopBarProps {
  title: string;
  children: React.ReactNode;
}

interface StyledSideBarWrapperProps {
  isOpen: boolean;
}

interface StyledSideBarProfileProps {
  isOpen: boolean;
}

type ComponentType = React.FC<TopBarProps> & { Item: SideBarItemType };

const StyledSideBarWrapper = styled.div<StyledSideBarWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  width: 80px;
  height: ${({ isOpen }) => (isOpen ? "var(--bme-vh, 100vh)" : "80px")};
  min-height: 80px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  ${bmeMixins.animations(["height"])};

  // If larger than container and safe area it's not needed to close the sidebar
  @media (min-width: 1300px) {
    height: var(--bme-vh, 100vh);
  }
`;

const StyledSideBarTitleWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const StyledSideBarTitleBackButton = styled.button`
  position: absolute;
  top: 0;
  left: calc(100% - 80px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.backgroundSecondary};
  border-left: 1px solid ${({ theme }) => theme.colors.primary};
  outline: none;
  cursor: pointer;
  appearance: none;
  ${bmeMixins.animations(["left", "border-right", "border-left"])};

  @media (min-width: 1300px) {
    left: 80px;
    border-right: 1px solid ${({ theme }) => theme.colors.primary};
    border-left: 1px solid ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const StyledSideBarTitlePlaceholder = styled.div`
  display: block;
  width: 100%;
  height: 80px;
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

const StyledSideBarProfile = styled.div<StyledSideBarProfileProps>`
  position: fixed;
  bottom: 0;
  left: 80px;
  z-index: 1005;
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: calc(100vw - 80px);
  min-height: 300px;
  ${bmeMixins.paddings("lg|md")}
  background: ${({ theme }) => theme.colors.gray6};

  transform: ${({ isOpen }) => (isOpen ? "rotateX(0deg)" : "rotateY(90deg)")};
  transform-origin: 0 50%;

  ${bmeMixins.animations(["transform"])};

  a {
    width: 100%;
  }
`;

const Component: ComponentType = ({ title, children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeProfileData = useAppSelector(selectProfileData);
  const storeLimitData = useAppSelector(selectLimitData);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isBackButtonVisible = router.pathname !== "/app";

  useEffect(() => {
    dispatch(profileActions.get());
    dispatch(limitActions.get());
  }, [dispatch]);

  const switchDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsProfileOpen(false);
  };

  return (
    <>
      <StyledSideBarWrapper isOpen={isDrawerOpen}>
        <StyledSideBarTop onClick={switchDrawerOpen}>
          <Brand withName={false} />
        </StyledSideBarTop>
        <StyledSideBarMenu>{children}</StyledSideBarMenu>
        <StyledSideBarBottom onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <BmeAvatar rounded size="small" />
        </StyledSideBarBottom>
        <StyledSideBarProfile isOpen={isProfileOpen}>
          <BmeBox alignY="top">
            <BmeBox margin="no|xs|no|no">
              <BmeText variant="Title2">
                {storeProfileData?.firstName} {storeProfileData?.lastName}
              </BmeText>
            </BmeBox>
            <BmeText>{storeProfileData?.role}</BmeText>
          </BmeBox>
          <BmeBox direction="column" width="100%" margin="no|no|xs|no">
            <BmeBox margin="no|no|xs|no">
              <BmeText noBottomMargin>
                <FormattedMessage
                  id="layout.app.profile.usage.pets"
                  values={{
                    petsCount: storeLimitData?.pets.used,
                    petsLimit: storeLimitData?.pets.limit ?? "∞",
                  }}
                />
              </BmeText>
            </BmeBox>
            <BmeBox margin="no|no|xs|no">
              <BmeText noBottomMargin>
                <FormattedMessage
                  id="layout.app.profile.usage.health_logs"
                  values={{
                    petsCount: storeLimitData?.healthLogs.used,
                    petsLimit: storeLimitData?.healthLogs.limit ?? "∞",
                  }}
                />
              </BmeText>
            </BmeBox>
            <BmeBox margin="no|no|xs|no">
              <BmeText noBottomMargin>
                <FormattedMessage
                  id="layout.app.profile.usage.weights"
                  values={{
                    petsCount: storeLimitData?.weights.used,
                    petsLimit: storeLimitData?.weights.limit ?? "∞",
                  }}
                />
              </BmeText>
            </BmeBox>
            <BmeBox margin="no|no|xs|no">
              <BmeText noBottomMargin>
                <FormattedMessage
                  id="layout.app.profile.usage.vets"
                  values={{
                    petsCount: storeLimitData?.vets.used,
                    petsLimit: storeLimitData?.vets.limit ?? "∞",
                  }}
                />
              </BmeText>
            </BmeBox>
          </BmeBox>
          <BmeBox direction="column" alignY="bottom" margin="auto|no|no">
            <BmeBox padding="no|no|xs" width="100%">
              <Link href="/app/settings">
                <BmeButton size="small" width="100%">
                  <FormattedMessage id="layout.app.profile.settings" />
                </BmeButton>
              </Link>
            </BmeBox>
            <BmeBox padding="no|no|xs" width="100%">
              <Link href="/app/settings/profile">
                <BmeButton size="small" width="100%">
                  <FormattedMessage id="layout.app.profile.profile" />
                </BmeButton>
              </Link>
            </BmeBox>
            <Link href="/auth/sign-off">
              <BmeButton size="small" width="100%">
                <FormattedMessage id="layout.app.profile.sign_off" />
              </BmeButton>
            </Link>
          </BmeBox>
        </StyledSideBarProfile>
      </StyledSideBarWrapper>
      <StyledSideBarTitleWrapper>
        {isBackButtonVisible && (
          <StyledSideBarTitleBackButton onClick={() => router.back()}>
            <FormattedMessage id="layout.app.back" />
          </StyledSideBarTitleBackButton>
        )}
        <BmeText variant="Title1">{title}</BmeText>
      </StyledSideBarTitleWrapper>
      <StyledSideBarTitlePlaceholder />
    </>
  );
};

Component.Item = Item;

export default Component;
