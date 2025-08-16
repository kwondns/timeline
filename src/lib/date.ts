export const formattingDateDiff = (diffMinute: number) => {
  if (diffMinute < 1) return '0 분';
  const hour = Math.floor(diffMinute / 60);
  const min = diffMinute % 60;
  let result = '';
  if (hour > 0) result += `${hour}시간 `;
  result += `${Math.round(min)} 분`;
  return result;
};

export function calculateDateDiff(startDate: string | Date, endDate?: string | Date, toNumber?: false): string;
export function calculateDateDiff(startDate: string | Date, endDate?: string | Date, toNumber?: true): number;
export function calculateDateDiff(startDate: string | Date, endDate?: string | Date, toNumber: boolean = false) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffMinute = (end.getTime() - start.getTime()) / 60 / 1000;
  if (toNumber) return diffMinute;
  return formattingDateDiff(diffMinute);
}

export const calcPreviousMonth = (date: Date, firstDay: number) =>
  new Date(date.getFullYear(), date.getMonth(), -firstDay + 1);

export const fromToDiffDateFormat = (startDate: string | Date, endDate: string | Date) => {
  const diff = calculateDateDiff(startDate, endDate);
  const start = new Date(startDate).toLocaleTimeString('ko-KR', { timeStyle: 'short', hour12: false });
  return `${start} 부터 ${diff}`;
};

export const createPastLink = (date: string, index = '0') => {
  const count = index === '0' ? '' : `?index=${index}`;

  return `/past/${new Date(new Date(date).getTime() + 9 * 1000 * 60 * 60).toISOString().slice(0, 10)}${count}`;
};
