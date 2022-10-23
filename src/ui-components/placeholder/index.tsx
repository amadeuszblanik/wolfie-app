import styled from "styled-components";
import type React from "react";

const StyledPlaceholder = styled.span<{ width?: string; height?: string }>`
  @keyframes placeholder {
    0% {
      background: ${({ theme }) => theme.palette.gray6};
    }
    33% {
      background: ${({ theme }) => theme.palette.gray5};
    }
    50% {
      background: ${({ theme }) => theme.palette.gray4};
    }
    66% {
      background: ${({ theme }) => theme.palette.gray5};
    }
    100% {
      background: ${({ theme }) => theme.palette.gray6};
    }
  }

  display: inline-flex;
  width: ${({ width }) => width || "var(--placeholder-width)"};
  height: ${({ height }) => height || "var(--placeholder-height)"};
  background: ${({ theme }) => theme.palette.gray6};
  transform: translateY(var(--placeholder-offset-y, 0));
  animation: placeholder 1.5s ease-in-out infinite;
`;

export default StyledPlaceholder;
