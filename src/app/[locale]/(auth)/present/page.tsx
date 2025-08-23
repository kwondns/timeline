import PresentTemplate from '@/templates/Present.template';
import { Suspense } from 'react';
import IndicatorSlot from '@/app/[locale]/(auth)/present/_slot/IndicatorSlot';
import TitleSlot from '@/app/[locale]/(auth)/present/_slot/TitleSlot';
import PresentTimeSlot from '@/app/[locale]/(auth)/present/_slot/PresentTimeSlot';
import ActionButtonSlot from '@/app/[locale]/(auth)/present/_slot/ActionButtonSlot';
import EditorSlot from '@/app/[locale]/(auth)/present/_slot/EditorSlot';
import { callGetWithAuth } from '@/lib/dal/http';
import { PresentType } from '@/types/present.type';

export default async function Page() {
  const present = await callGetWithAuth<PresentType>('/present', {
    next: { revalidate: false },
    tag: 'present',
  });

  return (
    <PresentTemplate
      indicatorSlot={
        <Suspense>
          <IndicatorSlot startTime={present.startTime ?? ''} />
        </Suspense>
      }
      titleSlot={
        <Suspense>
          <TitleSlot title={present.title ?? ''} />
        </Suspense>
      }
      presentTimeSlot={
        <Suspense>
          <PresentTimeSlot startTime={present.startTime ?? ''} />
        </Suspense>
      }
      actionButtonSlot={
        <Suspense>
          <ActionButtonSlot startTime={present.startTime ?? ''} />
        </Suspense>
      }
      editorSlot={
        <Suspense>
          <EditorSlot startTime={present.startTime ?? ''} />
        </Suspense>
      }
    />
  );
}
