import PresentTemplate from '@/templates/Present.template';
import { Suspense } from 'react';
import ActionButtonGroup from '@/molecules/ActionButtonGroup';
import { headers } from 'next/headers';
import { callGetWithAuth } from '@/lib/dal/http';
import { PresentType } from '@/types/present.type';
import PresentInputOrDisplay from '@/molecules/PresentInputOrDisplay';
import Indicator from '@/molecules/Indicator';
import Typography from '@/atoms/Typography';
import Editor from '@/molecules/Editor';
import PresentTime from '@/molecules/PresentTime';

export default async function Page() {
  const userId = (await headers()).get('x-user-id') as string;
  const present = await callGetWithAuth<PresentType>(`/present`, {
    next: { revalidate: false, tags: [`present-${userId}`] },
  });
  return (
    <PresentTemplate
      title={present.title}
      startTime={present.startTime}
      content={present.content}
      indicatorSlot={
        <Suspense>
          <Indicator active={!!present.startTime} />
          <Typography.h4 className="text-primary/70">
            {present.startTime ? new Date(present.startTime).toLocaleString('ko-kr') : ''}
          </Typography.h4>
        </Suspense>
      }
      titleSlot={
        <Suspense>
          <PresentInputOrDisplay title={present.title} />
        </Suspense>
      }
      presentTimeSlot={
        <Suspense>
          <PresentTime startTime={present.startTime ?? ''} />
        </Suspense>
      }
      actionButtonSlot={
        <Suspense>
          <ActionButtonGroup isStarted={!!present.startTime} />
        </Suspense>
      }
      editorSlot={
        <Suspense>
          <Editor startTimeString={present.startTime ?? ''} />
        </Suspense>
      }
    />
  );
}
