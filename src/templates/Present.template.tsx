import MDEditor from '@uiw/react-md-editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

import {
  DiffTimeSelector,
  EndTimeAtom,
  EndTimeSelector,
  MarkdownAtom,
  StartTimeAtom,
  StartTimeSelector,
  TitleAtom,
} from '@/stores/Present.store';
import { useUpdatePresent } from '@/hooks/usePresent';
import { usePastCreate } from '@/hooks/usePast';
import { DateTime } from '@/libs/date.lib';
import { onImagePasted } from '@/libs/markdown.lib';

type FormInputType = {
  title: string;
  startTime: string;
  endTime: string;
};
export default function PresentTemplate() {
  const [content, setContent] = useRecoilState(MarkdownAtom);
  const [startTime, setStartTime] = useRecoilState(StartTimeAtom);
  const [endTime, setEndTime] = useRecoilState(EndTimeAtom);
  const [title, setTitle] = useRecoilState(TitleAtom);
  const startTimeString = useRecoilValue(StartTimeSelector);
  const endTimeString = useRecoilValue(EndTimeSelector);
  const diffTime = useRecoilValue(DiffTimeSelector);
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTitle(value);
  };

  const { updatePresent, isUpdating } = useUpdatePresent();
  const onClickTempSave = () => {
    updatePresent({ title, content });
  };

  const { register, handleSubmit } = useForm<FormInputType>({
    values: {
      title,
      endTime: endTimeString,
      startTime: startTimeString,
    },
  });

  const { createPast, isCreating } = usePastCreate();

  const onClickSave = (input: FormInputType) => {
    const { title, endTime, startTime } = input;
    createPast(
      { content, title, endTime, startTime },
      {
        onSuccess: () => {
          setContent('');
          setTitle('');
          setStartTime(null);
          setEndTime(null);
        },
      },
    );
  };

  const onSaveShortcut = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if ((event.metaKey || event.ctrlKey) && key === 's') {
      event.preventDefault();
      onClickTempSave();
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-base-200">
      <form className="flex h-full flex-1 flex-col" onSubmit={handleSubmit(onClickSave)}>
        <div className="mx-4 p-4 md:py-8">
          <input
            className="input input-md input-bordered w-full text-xl md:input-lg md:text-2xl lg:text-3xl"
            id="title"
            type="text"
            placeholder="제목 입력"
            onKeyDown={onSaveShortcut}
            {...register('title', { required: true, onChange: onChangeTitle })}
          />
          <input type="hidden" {...register('startTime', { required: true })} />
          <input type="hidden" {...register('endTime', { required: true })} />
          <div className="flex flex-col justify-between gap-y-2 py-4 md:flex-row md:gap-x-4 md:gap-y-0">
            <span className="flex-1 rounded-lg bg-success/50 p-1 text-base text-white md:p-2 md:text-lg">{`시작시간 ${startTime ? DateTime(startTime) : ''}`}</span>
            <span className="flex-1 rounded-lg bg-error/50 p-1 text-base text-white md:p-2 md:text-lg">{`종료시간 ${endTime ? DateTime(endTime) : ''}`}</span>
            <span className="flex-1 rounded-lg bg-warning/50 p-1 text-base text-white md:p-2 md:text-lg">{`경과시간 ${diffTime || ''}`}</span>
          </div>
        </div>
        <div className="mx-4 flex justify-end gap-x-4 px-4 md:gap-x-12">
          <div className="mr-10 flex items-center gap-x-1">
            <kbd className="kbd">CMD</kbd>
            <p>or</p>
            <kbd className="kbd">CTRL</kbd>
            <p>+</p>
            <kbd className="kbd">S</kbd>
          </div>
          <button
            type="button"
            className="btn btn-primary content-center p-2 text-white md:p-4 md:text-xl lg:text-2xl"
            onClick={onClickTempSave}
            disabled={isUpdating}
          >
            임시 저장
          </button>
          <button
            type="submit"
            className="btn btn-success content-center p-2 text-white md:p-4 md:text-xl lg:text-2xl"
            disabled={isCreating}
          >
            저장
          </button>
        </div>
        <div className="flex max-h-full w-full flex-1 overflow-auto p-4">
          <MDEditor
            className="flex w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
            height="100%"
            value={content}
            onChange={(value) => {
              setContent(value as string);
            }}
            onPaste={async (event) => {
              await onImagePasted(event, event.clipboardData, 'timeline', startTimeString, setContent);
            }}
            onDrop={async (event) => {
              await onImagePasted(event, event.dataTransfer, 'timeline', startTimeString, setContent);
            }}
            textareaProps={{
              placeholder: '꾸준히 작성하자',
            }}
            onKeyDown={onSaveShortcut}
          />
        </div>
      </form>
    </div>
  );
}
