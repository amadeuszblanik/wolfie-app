import React from "react";
import { BmeBox, BmeText } from "bme-ui";
import Item from "./item";
import { uniqueArray } from "../../utils";
import { pipeDate } from "../../pipes";
import { CalendarDao } from "../../services/api/types/calendar.type";

interface CalendarListProps {
  items: CalendarDao[];
}

const Component: React.FC<CalendarListProps> = ({ items }) => {
  const itemsGroupedByDate: {
    date: {
      year: number;
      monthIndex: number;
    };
    events: CalendarDao[];
  }[] = [];

  const dates = uniqueArray(
    items.map((item) => {
      const dateStart = new Date(item.date.start);

      return {
        year: dateStart.getFullYear(),
        monthIndex: dateStart.getMonth(),
      };
    }),
  );

  dates.forEach((date) => {
    const eventsByDate = items.filter((item) => {
      const itemDate = new Date(item.date.start);

      return itemDate.getFullYear() === date.year && itemDate.getMonth() === date.monthIndex;
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
          <BmeBox
            alignX="center"
            width="100%"
            margin="no|no|xs"
            padding="xs"
            background="gray6"
            border="backgroundSecondary"
            rounded
          >
            <BmeText variant="Headline" color="gray" align="center">
              {pipeDate(new Date(date.year, date.monthIndex), { month: "long", year: "numeric" })}
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
