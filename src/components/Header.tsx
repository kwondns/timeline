import { useRecoilState } from 'recoil';

import { useUpdatePresent } from '@/hooks/usePresent';
import { EndTimeAtom, StartTimeAtom } from '@/stores/Present.store';
import Timer from '@/components/Timer';
import Nav from '@/components/Nav';

export default function Header() {
  const [startTime, setStartTime] = useRecoilState(StartTimeAtom);
  const [endTime, setEndTime] = useRecoilState(EndTimeAtom);
  const { updatePresent } = useUpdatePresent();
  const onClickStart = () => {
    if (startTime) return;
    const now = new Date();
    updatePresent(
      { startTime: now.toISOString() },
      {
        onError: () => {
          setStartTime(null);
        },
      },
    );
    setStartTime(now);
  };
  const onClickEnd = () => {
    if (endTime) return;
    const now = new Date();
    updatePresent(
      { endTime: now.toISOString() },
      {
        onError: () => {
          setEndTime(null);
        },
      },
    );
    setEndTime(now);
  };
  return (
    <header className="navbar flex h-14 w-screen justify-between bg-base-100">
      <Timer />
      <Nav />
      <div className="gap-x-6">
        <button
          type="button"
          className="btn btn-success text-white md:px-6 md:text-xl lg:px-12 lg:text-2xl"
          onClick={onClickStart}
          disabled={!!startTime}
        >
          시작
        </button>
        <button
          type="button"
          className="btn btn-error text-white md:px-6 md:text-xl lg:px-12 lg:text-2xl"
          onClick={onClickEnd}
          disabled={!!endTime}
        >
          종료
        </button>
      </div>
    </header>
  );
}
