import { useRecoilValue } from 'recoil';

import { PresentStore } from '@/stores';
import { DateLib } from '@/libs';

export default function Timer() {
  const time = useRecoilValue(PresentStore.CurrentTimeAtom);
  const startTime = useRecoilValue(PresentStore.StartTimeAtom);
  const endTime = useRecoilValue(PresentStore.EndTimeAtom);
  return (
    <div className="flex flex-col">
      <span className="text-rose-300 md:text-xl lg:text-2xl">
        {time.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
      </span>
      {startTime && (
        <span className="self-start text-sm">
          {endTime ? DateLib.dateFormat(startTime, endTime) : DateLib.dateFormat(startTime, time)}
        </span>
      )}
    </div>
  );
}
