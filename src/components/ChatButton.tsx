import { useSetRecoilState } from 'recoil';

import { isChatOpenStore } from '@/stores/Chat.store';

export default function ChatButton() {
  const setIsChatOpen = useSetRecoilState(isChatOpenStore);
  const onClickButton = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="btn-outline btn-info flex origin-center items-center justify-center self-end rounded-full border-[1px] border-info p-4"
      onClick={onClickButton}
    >
      <img src="/assets/chat.svg" alt="chat" className="size-6" />
    </button>
  );
}
