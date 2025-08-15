import { Icon } from '@/atoms/Icon';

export default [
  {
    title: '현재',
    url: '/present',
    icon: Icon['time'],
  },
  {
    title: '과거',
    url: '/past',
    icon: Icon['sandClock'],
  },
  {
    title: '달력',
    url: '/calendar',
    icon: Icon['calendar'],
  },
  {
    title: '미래',
    url: '/future',
    icon: Icon['rocket'],
  },
  {
    title: '시간',
    url: '/time',
    icon: Icon['analytics'],
  },
] as const;
