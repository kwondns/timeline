import ActivityCalendarItem from '@/molecules/ActivityCalendarItem';
import { getPasts } from '@/app/[locale]/(auth)/time/_api/getPasts';

export default async function ActivitySlot() {
  const pasts = await getPasts();
  const totalCalendarSlots = 30;
  const emptyCount = Math.max(0, totalCalendarSlots - pasts.length);

  return Array.from({ length: totalCalendarSlots }, (_, idx) => {
    // 빈 슬롯 영역: idx < emptyCount
    if (idx < emptyCount) {
      return <div key={`empty-${idx}`} className="cursor-pointer size-full rounded-lg bg-gray-400" />;
    }
    // 실제 데이터 영역: idx - emptyCount
    const activity = pasts[idx - emptyCount];
    return <ActivityCalendarItem key={activity.id} date={activity.date} count={activity.count} />;
  });
}
