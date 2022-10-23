import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import usePetsSingle from "../../../../../src/api/queries/get-pets-by-id";
import usePetsWeight from "../../../../../src/api/queries/pets-weight";
import { ComponentAddWeight, ComponentErrorScreen } from "../../../../../src/component";
import { LayoutApp } from "../../../../../src/layout";
import { DoggoButton, DoggoGrid, DoggoLineChart, DoggoList, DoggoText } from "../../../../../src/ui-components";
import { pipeDate } from "../../../../../src/pipe";
import useConfigPrivate from "../../../../../src/api/queries/config-private";
import usePetWeightAdd from "../../../../../src/api/queries/pet-weight-add";
import { ApiStatesTypes } from "../../../../../src/types/api-states.types";
import { ButtonSizes } from "../../../../../src/ui-components/button";
import { isEmpty } from "bme-utils";
import { DataDisplayPet } from "../../../../../src/data-display";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FunctionComponent<AddButtonProps> = ({ onClick }) => (
  <DoggoButton onClick={onClick} size={ButtonSizes.Small}>
    <FormattedMessage id="common.add" />
  </DoggoButton>
);

const REQUIRED_ELEMENTS_FOR_CHART = 3;

const App: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const { id } = router.query;

  const [containerWidth, setContainerWidth] = useState<number>();
  const [isOpenAddWeight, setIsOpenAddWeight] = useState(false);

  const { response: pet, error: petError, get: refetchPet } = usePetsSingle(id as string);
  const { petsWeight, petsWeightError, refetch: refetchPetWeight } = usePetsWeight(id as string);
  const { configPrivate, configPrivateError, refetch: refetchConfigPrivate } = useConfigPrivate();
  const { mutate: mutatePetWeightAdd, status: petWeightAddStatus } = usePetWeightAdd(String(id));

  const handleChangeContainerWidth = ({ width }: { width: number }) => {
    setContainerWidth(width);
  };

  const handleTryAgain = () => {
    void refetchPet();
    void refetchPetWeight();
    void refetchConfigPrivate();
  };

  useEffect(() => {
    switch (petWeightAddStatus) {
      case ApiStatesTypes.Success:
        setIsOpenAddWeight(false);
        void refetchPetWeight();
    }
  }, [petWeightAddStatus]);

  const isFetchedData = pet && petsWeight && configPrivate;
  const isError = !isFetchedData || petError || petsWeightError || configPrivateError;

  return (
    <LayoutApp
      title={intl.formatMessage({ id: "page.pet_weight.header" })}
      back
      right={<AddButton onClick={() => setIsOpenAddWeight(true)} />}
    >
      {!isError ? (
        <>
          <DoggoGrid mobile={1} desktop={1} onSizeChange={handleChangeContainerWidth}>
            <DataDisplayPet petId={String(id)} />
            {!isEmpty(petsWeight) && (
              <>
                {petsWeight!.length >= REQUIRED_ELEMENTS_FOR_CHART && (
                  <DoggoLineChart
                    width={containerWidth}
                    data={petsWeight.map(({ raw, date }) => ({ x: date, y: raw }))}
                  />
                )}
                <DoggoList label={configPrivate.weightUnits}>
                  {petsWeight.map(({ id: weightId, formatted, date }) => (
                    <DoggoList.Item
                      key={weightId}
                      actions={
                        <>
                          <DoggoButton variant="red" size={ButtonSizes.Small}>
                            <FormattedMessage id="common.delete" />
                          </DoggoButton>
                        </>
                      }
                      onClick={() => router.push(`/app/pet/${id}/weight/${weightId}`)}
                    >
                      <DoggoText>{formatted}</DoggoText>
                      <DoggoText>{pipeDate(date)}</DoggoText>
                    </DoggoList.Item>
                  ))}
                </DoggoList>
              </>
            )}
          </DoggoGrid>
          {isOpenAddWeight && (
            <ComponentAddWeight
              onClose={() => setIsOpenAddWeight(false)}
              onAdd={(body) => mutatePetWeightAdd(body)}
              unit={configPrivate.weightUnits}
            />
          )}
        </>
      ) : (
        <ComponentErrorScreen message={petError?.message} onTryAgain={handleTryAgain} />
      )}
    </LayoutApp>
  );
};

export default App;
