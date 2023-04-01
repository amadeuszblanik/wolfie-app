import styled from "styled-components";

export const StyledDrawer = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  z-index: 1000;
  width: 100%;
  max-height: 320px;
  overflow-x: scroll;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: ${({ theme }) => theme.radius}px;
`;

export const StyledDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledDrawerItem = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  cursor: pointer;
  appearance: none;

  &:hover {
    background: ${({ theme }) => theme.colors.gray5};
  }
`;
