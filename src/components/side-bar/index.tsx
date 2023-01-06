import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BmeAvatar, BmeBox, BmeButton, BmeProgressBar, BmeText } from "bme-ui";
import { bmeMixins } from "bme-ui";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Item, { SideBarItemType } from "./item";
import { Brand, Link } from "../../atoms";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authActions } from "../../store/auth.slice";
import { profileActions, selectProfileData } from "../../store/profile.slice";
import { configActions, selectConfigData } from "../../store/config.slice";

// @TODO: IN DEVELOPMENT

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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
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
  ${({ theme }) => bmeMixins.paddings("lg|md", theme)}
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
  const storeConfigData = useAppSelector(selectConfigData);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    dispatch(profileActions.get());
    dispatch(configActions.get());
  }, [dispatch]);

  const switchDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsProfileOpen(false);
  };

  const handleSignOff = () => {
    dispatch(authActions.signOff());
    void router.push("/auth/sign-in");
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
              <BmeText variant="Title2">{storeProfileData?.fullName}</BmeText>
            </BmeBox>
            <BmeText>
              <FormattedMessage id={`common.user_role.${storeProfileData?.userRole.toLowerCase() ?? "user"}`} />
            </BmeText>
          </BmeBox>
          <BmeBox direction="column" width="100%">
            <BmeBox margin="no|no|xs|no">
              <BmeText>
                <FormattedMessage
                  id="layout.app.profile.usage"
                  values={{
                    petsCount: storeConfigData?.userPets,
                    petsLimit: storeConfigData?.userPetsAllowed,
                  }}
                />
              </BmeText>
            </BmeBox>
            <BmeProgressBar
              value={
                storeConfigData?.userPets && storeConfigData?.userPetsAllowed
                  ? storeConfigData.userPets / storeConfigData.userPetsAllowed
                  : undefined
              }
            />
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
            <BmeButton size="small" width="100%" onClick={handleSignOff}>
              <FormattedMessage id="layout.app.profile.sign_off" />
            </BmeButton>
          </BmeBox>
        </StyledSideBarProfile>
      </StyledSideBarWrapper>
      <StyledSideBarTitleWrapper>
        <BmeText variant="Title1">{title}</BmeText>
      </StyledSideBarTitleWrapper>
      <StyledSideBarTitlePlaceholder />
    </>
  );
};

Component.Item = Item;

export default Component;
