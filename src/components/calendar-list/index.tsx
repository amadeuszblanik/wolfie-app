import React from "react";
import { BmeBox, BmeText } from "bme-ui";
import Item from "./item";
import { CalendarEntry } from "../../services/api/types/calendar/response.type";
import { DateType } from "../../types/date.ttype";
import { uniqueArray } from "../../utils";
import { pipeDate } from "../../pipes";

interface CalendarListProps {
  items: CalendarEntry[];
}

const Component: React.FC<CalendarListProps> = ({ items }) => {
  const itemsGroupedByDate: {
    date: DateType;
    events: CalendarEntry[];
  }[] = [];

  const dates = uniqueArray(
    items.map((item) => {
      const dateStart = new Date(item.date.start);

      return {
        year: dateStart.getFullYear(),
        monthIndex: dateStart.getMonth(),
        day: dateStart.getDate(),
      };
    }),
  );

  dates.forEach((date) => {
    const eventsByDate = items.filter((item) => {
      const itemDate = new Date(item.date.start);

      return (
        itemDate.getFullYear() === date.year &&
        itemDate.getMonth() === date.monthIndex &&
        itemDate.getDate() === date.day
      );
    });

    itemsGroupedByDate.push({
      date,
      events: eventsByDate,
    });
  });

  return (
    <BmeBox direction="column" width="100%">
      {itemsGroupedByDate.map(({ date, events }, index) => (
        <BmeBox key={index} direction="column" width="100%">
          <BmeBox alignX="center" width="100%" margin="no|no|xs" padding="xs" border="backgroundSecondary" rounded>
            <BmeText variant="Headline" color="gray" align="center">
              {pipeDate(new Date(date.year, date.monthIndex, date.day))}
            </BmeText>
          </BmeBox>
          {events.map((event) => (
            <Item key={event.id} {...event} />
          ))}
        </BmeBox>
      ))}
    </BmeBox>
  );
};

export default Component;
