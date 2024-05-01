import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
const FRIEND_TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

export class CalendarEvent {
  events: EventInput[];
  color?: string;
  textColor?: string;

  constructor(events: EventInput[], color?: string, textColor?: string) {
    this.events = events;
    this.color = color;
    this.textColor = textColor;
  }
}

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
  }
];

export const FRIEND_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Friend All-day event',
    start: FRIEND_TODAY_STR,
  },
  {
    id: createEventId(),
    title: 'Friend Timed event',
    start: FRIEND_TODAY_STR + 'T00:00:00',
    end: FRIEND_TODAY_STR + 'T03:00:00',
  },
  {
    id: createEventId(),
    title: 'Friend Timed event',
    start: FRIEND_TODAY_STR + 'T13:00:00',
    end: FRIEND_TODAY_STR + 'T15:00:00',
  }
];

export function createEventId() {
  return String(eventGuid++);
}
