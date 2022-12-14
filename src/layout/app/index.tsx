import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { DoggoBox, DoggoButton, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentBottombar, ComponentTopbar } from "../../component";
import { ButtonSizes } from "../../ui-components/button";

interface Props {
  children: React.ReactNode;
  title: string;
  back?: boolean;
  right?: React.ReactNode;
}

const StyledLayout = styled(DoggoBox)`
  padding-top: 80px;
`;

const AppBackButton: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <DoggoButton onClick={router.back} size={ButtonSizes.Small}>
      <FormattedMessage id="common.back" />
    </DoggoButton>
  );
};

const App: React.FunctionComponent<Props> = ({ children, title, back, right }) => (
  <>
    <StyledLayout padding={{ y: SizesEnum.Large }} column>
      <ComponentTopbar title={title} left={back && <AppBackButton />} right={right} />
      <DoggoContainer fullWidth>{children}</DoggoContainer>
      <ComponentBottombar />
    </StyledLayout>
  </>
);

export default App;
