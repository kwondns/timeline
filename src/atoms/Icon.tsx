import { CgSandClock, CgCalendar } from 'react-icons/cg';
import { SlRocket } from 'react-icons/sl';
import { IoMdTime, IoMdAdd, IoIosClose, IoIosSend, IoIosSettings } from 'react-icons/io';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { RiResetLeftFill, RiEnglishInput } from 'react-icons/ri';
import { IoAnalytics } from 'react-icons/io5';
import { TbMessage, TbAlphabetKorean, TbLanguageHiragana, TbLetterE, TbLetterF, TbLetterZ } from 'react-icons/tb';
import { GoCheckbox } from 'react-icons/go';
import { FaBarsProgress } from 'react-icons/fa6';

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
  check: <GoCheckbox />,
  progress: <FaBarsProgress />,
  setting: <IoIosSettings size={28} />,
  ko: <TbAlphabetKorean />,
  en: <RiEnglishInput />,
  ja: <TbLanguageHiragana />,
  es: <TbLetterE />,
  fr: <TbLetterF />,
  'zh-cn': <TbLetterZ />,
} as const;

export type IconType = keyof typeof Icon;
