import { BmeBox } from "bme-ui";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { isEmpty } from "bme-utils";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, useMobile } from "../../hooks";
import { selectVetData, selectVetError, selectVetStatus, vetActions } from "../../store/vet.slice";
import { ErrorMessage, Loader, VetCard } from "../../components";

const Scene = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const isMobile = useMobile();
  const router = useRouter();

  const apiStatus = useAppSelector(selectVetStatus);
  const error = useAppSelector(selectVetError);
  const vets = useAppSelector(selectVetData);

  useEffect(() => {
    dispatch(vetActions.get());
  }, [dispatch]);

  useEffect(() => {
    if (apiStatus === "success" && isEmpty(vets)) {
      void router.push("/app/vet/add");
    }
  }, [vets, apiStatus]);

  const handleTryAgain = () => {
    dispatch(vetActions.get());
  };

  return (
    <>
      <BmeBox wrap width="100%" minHeight="100%">
        {vets?.map((vet) => (
          <BmeBox key={vet.id} width={isMobile ? "100%" : "50%"} padding={isMobile ? "xs|no" : "xs"}>
            <VetCard {...vet} />
          </BmeBox>
        ))}
      </BmeBox>
      {apiStatus === "pending" && <Loader />}
      {apiStatus === "error" && (
        <ErrorMessage
          messages={[error || intl.formatMessage({ id: "error.generic_fetch" })]}
          onTryAgain={handleTryAgain}
        />
      )}
    </>
  );
};

export default Scene;
