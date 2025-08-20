import { atom } from 'recoil';

export const isChatOpenStore = atom<boolean>({
  default: false,
  key: 'chatStore',
});

export const isChatGeneratingStore = atom<boolean>({
  default: false,
  key: 'chatGeneratingStore',
});

export const currentChatStore = atom<string>({
  default: '',
  key: 'currentChatStore',
});

export const chatHistoryStore = atom<{ content: string; direction: 'start' | 'end' }[]>({
  default: [],
  key: 'chatHistoryStore',
});
