export enum CalendarEntryType {
  HealthLog = "healthLog",
}

export interface CalendarEntry {
  id: number;
  type: CalendarEntryType;
  date: {
    start: Date;
    end: Date;
  };
  title: string;
  description?: string;
  location?: string;
  pet?: {
    id: string;
    name: string;
  };
}

export type CalendarResponse = CalendarEntry[];
