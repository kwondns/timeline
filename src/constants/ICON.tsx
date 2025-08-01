import { CgSandClock, CgCalendar } from 'react-icons/cg';
import { SlRocket } from 'react-icons/sl';
import { IoMdTime } from 'react-icons/io';

export const ICON = {
  sandClock: CgSandClock,
  time: IoMdTime,
  rocket: SlRocket,
  calendar: CgCalendar,
} as const;

export type IconType = keyof typeof ICON;
