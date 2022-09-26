import React from "react";
import { DoggoBox, DoggoButton, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentBottombar, ComponentTopbar } from "../../component";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

interface Props {
  children: React.ReactNode;
  title: string;
  back?: boolean;
  right?: React.ReactNode;
}

const StyledLayout = styled(DoggoBox)`
  padding-top: 64px;
  padding-bottom: 120px;
`;

const AppBackButton: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <DoggoButton onClick={router.back}>
      <FormattedMessage id="common.back" />
    </DoggoButton>
  );
};

const App: React.FunctionComponent<Props> = ({ children, title, back, right }) => {
  return (
    <StyledLayout padding={{ y: SizesEnum.Large }} column>
      <ComponentTopbar title={title} left={back && <AppBackButton />} right={right} />
      <DoggoContainer fullWidth>{children}</DoggoContainer>
      <ComponentBottombar />
    </StyledLayout>
  );
};

export default App;
