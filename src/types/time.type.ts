import { PastListType } from '@/types/past.type';
import { FutureContentProps } from '@/molecules/FutureContent';

export type TimePastType = PastListType;

export type TimeFutureType = {
  id: string;
  title: string;
  order: number;
  progressRatio: number;
  totalFutures: number;
  completedFutures: number;
  checked: boolean;
  lastCompletedFuture: (FutureContentProps & { updatedAt: string })[];
};
