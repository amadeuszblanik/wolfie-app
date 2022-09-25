import type { NextPage } from "next";
import Head from "next/head";
import { LayoutApp } from "../../src/layout";
import usePetsMy from "../../src/api/queries/pets-my";
import { DoggoGrid, DoggoLoader } from "../../src/ui-components";
import { SizesEnum } from "../../src/settings/sizes";
import { ComponentCsr, ComponentErrorScreen, ComponentPetCard } from "../../src/component";
import Link from "next/link";
import { useIntl } from "react-intl";

const App: NextPage = () => {
  const intl = useIntl();

  const { myPets, myPetsError, refetch, isLoading } = usePetsMy();

  return (
    <div>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.app.header" })}>
        <ComponentCsr>
          {isLoading && <DoggoLoader fullScreen size={SizesEnum.ExtraLarge} />}
          {myPets && (
            <DoggoGrid mobile={1} desktop={2}>
              {myPets.map((pet) => (
                <Link href={`/app/pet/${pet.id}`} key={pet.id}>
                  <a>
                    <ComponentPetCard {...pet} />
                  </a>
                </Link>
              ))}
            </DoggoGrid>
          )}
          {myPetsError && <ComponentErrorScreen message={myPetsError.message} onTryAgain={refetch} />}
        </ComponentCsr>
      </LayoutApp>
    </div>
  );
};

export default App;
