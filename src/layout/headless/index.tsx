import React from "react";
import styled from "styled-components";
import { DoggoBox, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";

interface Props {
  children: React.ReactNode;
}

const StyledLayout = styled(DoggoBox)`
  padding-top: 80px;
`;

const App: React.FunctionComponent<Props> = ({ children }) => (
  <>
    <StyledLayout padding={{ y: SizesEnum.Large }} column>
      <DoggoContainer fullWidth>{children}</DoggoContainer>
    </StyledLayout>
  </>
);

export default App;
