import styled from "styled-components";
import { BmeBox, BmeSpinner } from "bme-ui";
import { Container } from "../../atoms";

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1080;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
`;

const Component = () => (
  <StyledLoader>
    <Container>
      <BmeBox alignX="center" alignY="center" width="100%">
        <BmeSpinner size="large" variant="primary" />
      </BmeBox>
    </Container>
  </StyledLoader>
);

export default Component;
