import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoGrid } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentBottombar, ComponentTopbar } from "../../component";
import { ButtonSizes } from "../../ui-components/button";
import { DataDisplayPet } from "../../data-display";

interface Props {
  children: React.ReactNode;
  title: string;
  back?: boolean;
  right?: React.ReactNode;
  petId: string;
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

const App: React.FunctionComponent<Props> = ({ children, title, back, right, petId }) => (
  <>
    <StyledLayout padding={{ y: SizesEnum.Large }} column>
      <ComponentTopbar title={title} left={back && <AppBackButton />} right={right} />
      <DoggoContainer fullWidth>
        <DoggoGrid mobile={1} desktop={1}>
          <DataDisplayPet petId={petId} />
          {children}
        </DoggoGrid>
      </DoggoContainer>
      <ComponentBottombar />
    </StyledLayout>
  </>
);

export default App;
