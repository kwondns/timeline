import { atom } from 'recoil';

export const PastDateAtom = atom({
  key: 'pastDateAtom',
  default: new Date().toLocaleDateString(),
});

export const PastDateCountAtom = atom({
  key: 'pastDateCountAtom',
  default: 0,
});

export const AccordionAtom = atom({
  key: 'accordionAtom',
  default: 0,
});
export const CalendarAtom = atom({
  key: 'calendarAtom',
  default: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
});
