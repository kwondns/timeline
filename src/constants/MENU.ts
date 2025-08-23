import { Icon } from '@/atoms/Icon';

export default [
  {
    key: 'present',
    url: '/present',
    icon: Icon['time'],
  },
  {
    key: 'past',
    url: '/past',
    icon: Icon['sandClock'],
  },
  {
    key: 'calendar',
    url: '/calendar',
    icon: Icon['calendar'],
  },
  {
    key: 'future',
    url: '/future',
    icon: Icon['rocket'],
  },
  {
    key: 'time',
    url: '/time',
    icon: Icon['analytics'],
  },
] as const;
