import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { BmeButton } from "bme-ui";
import { firstElement, isEmpty } from "bme-utils";
import Filter from "./filter";
import List from "./list";
import Chart from "./chart";
import useLogic from "./logic";
import { useResizeObserver } from "../../hooks";
import { ErrorMessage, Loader, PetCard } from "../../components";
import { Link } from "../../atoms";

// @TODO: Move add entry button to some other place - temporary solution

const StyledSceneWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    grid-gap: 24px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Scene = () => {
  const {
    petSingle,
    weightUnit,
    weightData,
    isPending,
    isError,
    errorMessages,
    tryAgain,
    weightFilter,
    setWeightFilter,
    petId,
  } = useLogic();

  const ref = useRef<HTMLDivElement>(null);

  const [chartWidth, setChartWidth] = useState<number | undefined>(undefined);

  useResizeObserver(ref, (entries) => {
    const width = firstElement(entries)?.contentRect.width;

    setChartWidth(width);
  });

  if (isError) {
    return <ErrorMessage messages={errorMessages} onTryAgain={tryAgain} />;
  }

  return (
    <div ref={ref}>
      <StyledSceneWrapper>
        {petSingle && <PetCard {...petSingle} />}
        <Filter selected={weightFilter} entries={weightData} onChange={setWeightFilter} />
        <Chart entries={weightData} width={chartWidth} />
        {!isEmpty(weightData) ? (
          <>
            <Link href={`/app/pet/${petId}/weight/add`}>
              <BmeButton width="100%">
                <FormattedMessage id="page.pet_weight.add_entry" />
              </BmeButton>
            </Link>
            <List weightUnit={weightUnit} entries={weightData} />
          </>
        ) : (
          <Link href={`/app/pet/${petId}/weight/add`}>
            <BmeButton width="100%">
              <FormattedMessage id="page.pet_weight.no_entries" />
            </BmeButton>
          </Link>
        )}
        {isPending && <Loader />}
      </StyledSceneWrapper>
    </div>
  );
};

export default Scene;
