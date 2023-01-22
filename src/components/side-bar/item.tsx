import React from "react";
import { BmeIcon, bmeMixins, BmeText } from "bme-ui";
import styled from "styled-components";
import { IconName } from "bme-ui/dist/atoms/icon/types";
import { Link } from "../../atoms";

// @TODO: Handle longer labels

export interface SideBarItemProps {
  icon: IconName;
  label: string;
  href: string;
}

export type SideBarItemType = React.FC<SideBarItemProps>;

const StyledSideBarItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  height: 80px;
  ${bmeMixins.paddings("sm")}
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  cursor: pointer;
  appearance: none;
`;

const Component: React.FC<SideBarItemProps> = ({ icon, label, href }) => (
  <Link href={href}>
    <StyledSideBarItem>
      <BmeIcon name={icon} />
      <BmeText variant="Caption1">{label}</BmeText>
    </StyledSideBarItem>
  </Link>
);

export default Component;
