import styled from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";

interface ContainerProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

interface StyledContainerProps {
  fullWidth?: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : `fit-content`)};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Sizes[SizesEnum.ExtraLarge]}px;
`;

const Container = ({ children, ...props }: ContainerProps) => <StyledContainer {...props}>{children}</StyledContainer>;

export default Container;
