import PresentTemplate from '@/templates/Present.template';
import { Suspense } from 'react';
import IndicatorSlot from '@/app/(auth)/present/_slot/IndicatorSlot';
import TitleSlot from '@/app/(auth)/present/_slot/TitleSlot';
import PresentTimeSlot from '@/app/(auth)/present/_slot/PresentTimeSlot';
import ActionButtonSlot from '@/app/(auth)/present/_slot/ActionButtonSlot';
import EditorSlot from '@/app/(auth)/present/_slot/EditorSlot';
import { callGetWithAuth } from '@/lib/dal/http';
import { PresentType } from '@/types/present.type';
import { getTokenAndUserId } from '@/lib/auth/token';

export default async function Page() {
  const { userId, token } = await getTokenAndUserId();
  const present = await callGetWithAuth<PresentType>('/present', {
    next: { revalidate: false, tags: [`present-${userId}`] },
    userId,
    token,
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
