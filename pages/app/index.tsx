import type { NextPage } from "next";
import Head from "next/head";
import { LayoutApp } from "../../src/layout";
import usePetsMy from "../../src/api/queries/pets-my";
import { DoggoLoader } from "../../src/ui-components";
import { SizesEnum } from "../../src/settings/sizes";
import { ComponentCsr, ComponentErrorScreen, ComponentPetCardGrid } from "../../src/component";

const App: NextPage = () => {
  const { myPets, myPetsError, refetch, isLoading } = usePetsMy();

  return (
    <div>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutApp>
        <ComponentCsr>
          {isLoading && <DoggoLoader fullScreen size={SizesEnum.ExtraLarge} />}
          {myPets && <ComponentPetCardGrid pets={myPets} />}
          {myPetsError && <ComponentErrorScreen message={myPetsError.message} onTryAgain={refetch} />}
        </ComponentCsr>
      </LayoutApp>
    </div>
  );
};

export default App;
