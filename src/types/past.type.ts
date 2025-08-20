export type PastListType = {
  id: string;
  date: string;
  count: number;
  titles: string[] | [null];
  titles_count: number;
};

export type PastActivityType = {
  content: string;
  created_at: string;
  endTime: string;
  id: string;
  startTime: string;
  title: string;
  updated_at: string;
};
