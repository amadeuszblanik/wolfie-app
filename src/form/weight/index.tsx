import { BmeBox, BmeButton, BmeInput, BmeInputDate, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormDeprecated, Loader } from "../../components";
import { toInputDate, toInputTime } from "../../utils";
import { selectProfileData } from "../../store/profile.slice";
import {
  petsWeightActions,
  selectPetsWeightDataById,
  selectPetsWeightPatchError,
  selectPetsWeightPatchStatus,
  selectPetsWeightPostError,
  selectPetsWeightPostStatus,
  selectPetsWeightStatus,
} from "../../store/petsWeight.slice";

// @TODO Add BmeInputNumber to bme-ui
// @TODO Add suffix and prefix to BmeInput - might not be required

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const weightId = router.query.weightId as string | undefined;

  const isUpdate = !!weightId;

  const storePetsWeightStatus = useAppSelector(selectPetsWeightStatus);
  const storePetsWeightPostStatus = useAppSelector(selectPetsWeightPostStatus);
  const storePetsWeightPostError = useAppSelector(selectPetsWeightPostError);
  const storePetsWeightPatchStatus = useAppSelector(selectPetsWeightPatchStatus);
  const storePetsWeightPatchError = useAppSelector(selectPetsWeightPatchError);
  const storePetsWeightDataById = useAppSelector(selectPetsWeightDataById(weightId || ""));
  const storeProfileData = useAppSelector(selectProfileData);

  const status = isUpdate ? storePetsWeightPatchStatus : storePetsWeightPostStatus;
  const error = isUpdate ? storePetsWeightPatchError : storePetsWeightPostError;

  const isLoadingWeights = storePetsWeightStatus === "pending" && status !== "success";

  const isError = status === "error";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelBorderColor, setModelBorderColor] = useState<keyof DefaultTheme["colors"]>("red");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(toInputDate());
  const [time, setTime] = useState(toInputTime());

  useEffect(() => {
    dispatch(petsWeightActions.resetPost());
    dispatch(petsWeightActions.resetPatch());
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (storePetsWeightDataById === undefined && petId) {
      dispatch(petsWeightActions.get({ petId }));
    }
  }, [storePetsWeightDataById, petId, dispatch]);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
      setModelBorderColor("red");
    }

    if (status === "success") {
      setIsModalOpen(true);
      setModelBorderColor("green");
    }
  }, [error, status]);

  useEffect(() => {
    if (storePetsWeightDataById) {
      setWeight(String(storePetsWeightDataById.raw || ""));
      setDate(toInputDate(new Date(storePetsWeightDataById.date)));
      setTime(toInputTime(new Date(storePetsWeightDataById.date)));
    }
  }, [storePetsWeightDataById]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      weight: Number(weight),
      date: new Date(`${date} ${time}`),
    };

    if (!petId) {
      // @TODO Add validation

      return;
    }

    if (weightId) {
      dispatch(
        petsWeightActions.patch({
          petId,
          weightId,
          payload,
        }),
      );

      return;
    }

    dispatch(
      petsWeightActions.post({
        petId,
        payload,
      }),
    );
  };

  return (
    <FormDeprecated
      onSubmit={handleSubmit}
      apiStatus={status}
      modalBorder={modelBorderColor}
      modal={
        isModalOpen ? (
          <BmeText align="center">
            {isError
              ? error ||
                intl.formatMessage({ id: petId ? "common.form.weight_update.error" : "common.form.weight_add.error" })
              : intl.formatMessage({
                  id: petId ? "common.form.weight_update.success" : "common.form.weight_add.success",
                })}
          </BmeText>
        ) : undefined
      }
      onCloseModal={isError ? () => setIsModalOpen(false) : undefined}
    >
      <>
        <BmeBox direction="column" alignX="center" alignY="center" width="100%" maxWidth="420px" margin="no|auto">
          <BmeBox width="100%" margin="no|no|sm">
            <BmeInputDate
              name="date"
              value={date}
              label={intl.formatMessage({ id: "common.form.date.label" })}
              onValue={setDate}
              width="100%"
              type="date"
            />
          </BmeBox>
          <BmeBox width="100%" margin="no|no|sm">
            <BmeInputDate
              name="time"
              value={time}
              label={intl.formatMessage({ id: "common.form.time.label" })}
              onValue={setTime}
              width="100%"
              type="time"
            />
          </BmeBox>
          <BmeBox alignX="space-between" alignY="bottom" width="100%" margin="no|no|sm">
            <BmeInput
              name="weight"
              value={weight}
              label={intl.formatMessage({ id: "common.form.weight.label" })}
              onValue={setWeight}
              width="100%"
            />
            <BmeBox padding="xs|no|no|xs">
              <BmeText>{storeProfileData?.weightUnit || "…"}</BmeText>
            </BmeBox>
          </BmeBox>
          <BmeBox margin="no|no|lg">
            <BmeButton type="submit">
              <FormattedMessage id={isUpdate ? "common.form.update.label" : "common.form.add.label"} />
            </BmeButton>
          </BmeBox>
        </BmeBox>
        {isLoadingWeights && <Loader />}
      </>
    </FormDeprecated>
  );
};

export default Component;
