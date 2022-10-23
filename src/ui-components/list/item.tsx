import React from "react";
import styled from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Icon from "../icon";

export interface ItemProps {
  children: string | React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
}

interface StyledItemProps {
  clickable: boolean;
  actionsVisible: boolean;
}

interface StyledItemActionsProps {
  visible: boolean;
}

const TOUCH_STARTING_VALUE = 0;
const TOUCH_INDEX = 0;
const DRAG_REQUIRED = -10;

const StyledLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${Sizes[SizesEnum.Medium]}px ${Sizes[SizesEnum.Medium]}px;
  overflow-x: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray5};

  &:last-child {
    border-bottom: none;
  }
`;

const StyledItem = styled.div<StyledItemProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  opacity: ${({ actionsVisible }) => (actionsVisible ? "0.66" : "1")};
  transition: opacity 0.2s ease-in-out;
  will-change: opacity;

  *:nth-child(2) {
    --color-text: ${({ theme }) => theme.palette.gray2};
  }
`;

const StyledItemIcon = styled.div`
  display: flex;
  padding: 0 ${Sizes[SizesEnum.Medium]}px;
  transform: translateY(-1px);
`;

const StyledItemActions = styled.div<StyledItemActionsProps>`
  position: absolute;
  top: 0;
  left: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  background: ${({ theme }) => theme.palette.red};
  transform: ${({ visible }) => (visible ? "translateX(-100%)" : "translateX(0)")};
  transition: transform 0.3s ease-in-out;
  will-change: transform;
  --button-radius: 0;

  * {
    white-space: nowrap;
  }
`;

const Item: React.FunctionComponent<ItemProps> = ({ children, actions, onClick }) => {
  const [mousePositionY, setMousePositionY] = React.useState(TOUCH_STARTING_VALUE);
  const [actionVisible, setActionVisible] = React.useState(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLLIElement>) => {
    setMousePositionY(event.touches[TOUCH_INDEX].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLLIElement>) => {
    const diff = mousePositionY - event.changedTouches[TOUCH_INDEX].clientX;

    if (diff > Math.abs(DRAG_REQUIRED)) {
      setActionVisible(true);
    }

    if (diff < DRAG_REQUIRED) {
      setActionVisible(false);
    }
  };

  return (
    <StyledLi
      onMouseEnter={() => setActionVisible(true)}
      onMouseLeave={() => setActionVisible(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StyledItem onClick={onClick} clickable={!!onClick} actionsVisible={!!actions && actionVisible}>
        {children}
      </StyledItem>
      {onClick && (
        <StyledItemIcon>
          <Icon icon="chevron-right" color="gray2" />
        </StyledItemIcon>
      )}
      {actions && <StyledItemActions visible={actionVisible}>{actions}</StyledItemActions>}
    </StyledLi>
  );
};

export default Item;
