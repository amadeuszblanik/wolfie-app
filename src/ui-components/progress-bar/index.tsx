import styled from "styled-components";
import { SizesEnum } from "../../settings/sizes";
import { sizeMixin } from "../mixins";

interface Props {
  size?: SizesEnum;
  value?: number;
  duration?: number;
  fixed?: boolean;
}

interface StyledProgressBarProps {
  size?: SizesEnum;
  value?: number;
  duration?: number;
  fixed?: boolean;
}

const LOADER_SIZES: { [key in SizesEnum]: number } = {
  [SizesEnum.ExtraSmall2]: 1,
  [SizesEnum.ExtraSmall]: 2,
  [SizesEnum.Small]: 3,
  [SizesEnum.Medium]: 4,
  [SizesEnum.Large]: 6,
  [SizesEnum.Large2]: 8,
  [SizesEnum.ExtraLarge]: 12,
  [SizesEnum.ExtraLarge2]: 24,
};

const StyledProgressBar = styled.div<StyledProgressBarProps>`
  @keyframes progress-bar {
    0% {
      width: 0;
      opacity: 0;
    }

    100% {
      width: ${({ value }) => value}%;
      opacity: 1;
    }
  }

  position: ${({ fixed }) => (fixed ? "fixed" : "relative")};
  z-index: 2000;
  width: ${({ value }) => value}%;
  height: ${({ size }) => sizeMixin(size || SizesEnum.ExtraSmall2, LOADER_SIZES)};
  background-color: ${({ theme }) => theme.palette.primary};
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.primary};
  animation: progress-bar ${({ duration }) => duration}ms ease-in-out;
`;

const Component = (props: Props) => <StyledProgressBar {...props} />;

Component.defaultProps = {
  duration: 1250,
};

export default Component;
