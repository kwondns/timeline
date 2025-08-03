export const calculateDateDiff = (startDate: string | Date) => {
  const start = new Date(startDate);
  const end = new Date();
  const diffMinute = (end.getTime() - start.getTime()) / 60 / 1000;
  if (diffMinute < 1) return '0 분';
  const hour = Math.floor(diffMinute / 60);
  const min = diffMinute % 60;
  let result = '';
  if (hour > 0) result += `${hour}시간 `;
  result += `${Math.round(min)} 분`;
  return result;
};

export const calcPreviousMonth = (date: Date, firstDay: number) =>
  new Date(date.getFullYear(), date.getMonth(), -firstDay + 1);
