import { CgSandClock, CgCalendar } from 'react-icons/cg';
import { SlRocket } from 'react-icons/sl';
import { IoMdTime, IoMdAdd, IoIosClose, IoIosSend } from 'react-icons/io';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { RiResetLeftFill } from 'react-icons/ri';
import { IoAnalytics } from 'react-icons/io5';
import { TbMessage } from 'react-icons/tb';

export const Icon = {
  sandClock: <CgSandClock />,
  time: <IoMdTime />,
  rocket: <SlRocket />,
  calendar: <CgCalendar />,
  add: <IoMdAdd />,
  next: <MdNavigateNext />,
  before: <MdNavigateBefore />,
  reset: <RiResetLeftFill />,
  analytics: <IoAnalytics />,
  message: <TbMessage />,
  close: <IoIosClose />,
  send: <IoIosSend />,
} as const;

export type IconType = keyof typeof Icon;
