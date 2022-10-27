import styled from "styled-components";

interface StyledGridItemProps {
  mobile?: number;
  desktop?: number;
}

const StyledGridItem = styled.div<StyledGridItemProps>`
  ${({ mobile }) => mobile && `grid-column: 1 / ${mobile};`}

  ${({ desktop }) =>
    desktop &&
    `@media screen and (min-width: 900px) {
  grid-column: 1 / ${desktop};
  }`}
`;

export default StyledGridItem;
