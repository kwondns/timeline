import { PastListType } from '@/types/past.type';

export type TimePastType = PastListType;

export type TimeFutureType = {
  id: string;
  title: string;
  order: number;
  progressRatio: number;
  totalFutures: number;
  completedFutures: number;
  checked: boolean;
};
