import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { DoggoBox, DoggoButton, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { ComponentApiWrapper, ComponentBottombar, ComponentPetCard, ComponentTopbar } from "../../component";
import { ButtonSizes } from "../../ui-components/button";
import usePetsSingle from "../../api/queries/get-pets-by-id";

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

const App: React.FunctionComponent<Props> = ({ children, title, back, right, petId }) => {
  const { response: pet, error: petError, status } = usePetsSingle(petId);

  const errors = [petError];
  const statuses = [status];

  return (
    <>
      <StyledLayout padding={{ y: SizesEnum.Large }} column>
        <ComponentTopbar title={title} left={back && <AppBackButton />} right={right} />
        <DoggoContainer fullWidth>
          <ComponentApiWrapper error={errors} status={statuses}>
            {pet && <ComponentPetCard data={pet} />}
            {children}
          </ComponentApiWrapper>
        </DoggoContainer>
        <ComponentBottombar />
      </StyledLayout>
    </>
  );
};

export default App;
