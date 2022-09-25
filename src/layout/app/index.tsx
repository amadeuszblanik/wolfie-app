import React from "react";
import { DoggoBox, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentBottombar, ComponentTopbar } from "../../component";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  title: string;
  back?: boolean;
}

const StyledLayout = styled(DoggoBox)`
  padding-top: 64px;
  padding-bottom: 120px;
`;

const App: React.FunctionComponent<Props> = ({ children, title, back }) => {
  return (
    <StyledLayout padding={{ y: SizesEnum.Large }} column>
      <ComponentTopbar title={title} back={back} />
      <DoggoContainer fullWidth>{children}</DoggoContainer>
      <ComponentBottombar />
    </StyledLayout>
  );
};

export default App;
