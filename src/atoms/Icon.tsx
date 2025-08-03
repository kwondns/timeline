import { CgSandClock, CgCalendar, CgAdd } from 'react-icons/cg';
import { SlRocket } from 'react-icons/sl';
import { IoMdTime } from 'react-icons/io';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { RiResetLeftFill } from 'react-icons/ri';

export const Icon = {
  sandClock: <CgSandClock />,
  time: <IoMdTime />,
  rocket: <SlRocket />,
  calendar: <CgCalendar />,
  add: <CgAdd />,
  next: <MdNavigateNext />,
  before: <MdNavigateBefore />,
  reset: <RiResetLeftFill />,
} as const;

export type IconType = keyof typeof Icon;
