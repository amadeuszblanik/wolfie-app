import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { toRgba } from "bme-utils";
import Container from "../container";
import Box, { BoxWidth, FlexAlign } from "../box";
import { SizesEnum } from "../../settings/sizes";
import Icon from "../icon";
import Button from "../button";
import { ConfigContext, ConfigContextType } from "../../context/config.context";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const StyledModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => toRgba(theme.palette.background, theme.modalBackgroundOpacity)};
  backdrop-filter: blur(2px);
`;

const StyledModalWindow = styled(Box)`
  max-width: 100%;
  padding-bottom: 42px;
`;

const Component: React.FunctionComponent<Props> = ({ children, onClose }) => {
  const { setScrollEnabled } = useContext<ConfigContextType>(ConfigContext);

  useEffect(() => {
    setScrollEnabled(false);

    return () => {
      setScrollEnabled(true);
    };
  }, [setScrollEnabled]);

  return (
    <StyledModalBackdrop>
      <Container fullWidth>
        <StyledModalWindow
          width={BoxWidth.Full}
          padding={{ x: SizesEnum.Medium, y: SizesEnum.Large }}
          background="backgroundSecondary"
          column
        >
          <Box width={BoxWidth.Full} alignX={FlexAlign.Right} padding={{ x: SizesEnum.Medium, y: SizesEnum.Medium }}>
            <Button onClick={onClose}>
              <Icon icon="close-circle" size={SizesEnum.ExtraLarge} />
            </Button>
          </Box>
          {children}
        </StyledModalWindow>
      </Container>
    </StyledModalBackdrop>
  );
};

export default Component;
