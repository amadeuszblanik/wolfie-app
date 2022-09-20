import React from "react";
import { DoggoBox, DoggoContainer } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { useRouter } from "next/router";
import { ComponentBottombar } from "../../component";

interface Props {
  children: React.ReactNode;
}

const App: React.FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <DoggoBox padding={{ y: SizesEnum.Large }} column>
      <DoggoContainer fullWidth>{children}</DoggoContainer>
      <ComponentBottombar />
    </DoggoBox>
  );
};

export default App;
