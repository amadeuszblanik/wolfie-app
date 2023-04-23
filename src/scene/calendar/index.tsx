import { BmeBox } from "bme-ui";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  calendarActions,
  selectCalendarData,
  selectCalendarError,
  selectCalendarStatus,
} from "../../store/calendar.slice";
import { CalendarList, ErrorMessage, Loader } from "../../components";

const Scene = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const calendarStatus = useAppSelector(selectCalendarStatus);
  const calendarError = useAppSelector(selectCalendarError);
  const calendarData = useAppSelector(selectCalendarData);

  useEffect(() => {
    dispatch(calendarActions.get());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(calendarActions.get());
  };

  return (
    <>
      {calendarStatus === "success" && (
        <BmeBox wrap width="100%">
          {calendarData && <CalendarList items={calendarData} />}
        </BmeBox>
      )}
      {calendarStatus === "pending" && <Loader />}
      {calendarStatus === "error" && (
        <ErrorMessage
          messages={[calendarError || intl.formatMessage({ id: "error.generic_fetch" })]}
          onTryAgain={handleTryAgain}
        />
      )}
    </>
  );
};

export default Scene;
