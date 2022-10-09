import React from "react";
import { DoggoBox, DoggoButton, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { FlexAlign } from "../../ui-components/box";

interface Props {
  children: React.ReactNode;
}

const StyledLayout = styled(DoggoBox)`
  padding-top: 80px;
`;

const App: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <DoggoContainer fullWidth>
        <StyledLayout alignX={FlexAlign.Center} padding={{ y: SizesEnum.Large }} column>
          {children}
          <DoggoBox padding={{ top: SizesEnum.Large }}>
            <Link href="/">
              <a>
                <DoggoButton variant="blue">
                  <FormattedMessage id="common.go_home" />
                </DoggoButton>
              </a>
            </Link>
          </DoggoBox>
        </StyledLayout>
      </DoggoContainer>
    </>
  );
};

export default App;
