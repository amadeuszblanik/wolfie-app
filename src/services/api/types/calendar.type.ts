import { CalendarElementKind } from "../../../types/calendar-element-kind.type";
import { CalendarPriority } from "../../../types/calendar-priority.type";

interface CalendarElement {
  id: string;
  kind: CalendarElementKind;
}

export interface CalendarDao {
  id: string;
  title: string;
  description: string | null;
  pet: {
    id: string;
    name: string;
  };
  date: {
    start: Date;
    end: Date;
    wholeDay: boolean;
  };
  location: {
    formatted: string | null;
    address: string | null;
    city: string | null;
    postCode: string | null;
    country: string | null;
  } | null;
  contact: {
    phoneNumber: string | null;
    email: string | null;
  } | null;
  priority: CalendarPriority;
  elements: CalendarElement[];
}
