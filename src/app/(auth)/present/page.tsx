import PresentTemplate from '@/templates/Present.template';
import { Suspense } from 'react';
import IndicatorSlot from '@/app/(auth)/present/_slot/IndicatorSlot';
import TitleSlot from '@/app/(auth)/present/_slot/TitleSlot';
import PresentTimeSlot from '@/app/(auth)/present/_slot/PresentTimeSlot';
import ActionButtonSlot from '@/app/(auth)/present/_slot/ActionButtonSlot';
import EditorSlot from '@/app/(auth)/present/_slot/EditorSlot';

export default async function Page() {
  return (
    <PresentTemplate
      indicatorSlot={
        <Suspense>
          <IndicatorSlot />
        </Suspense>
      }
      titleSlot={
        <Suspense>
          <TitleSlot />
        </Suspense>
      }
      presentTimeSlot={
        <Suspense>
          <PresentTimeSlot />
        </Suspense>
      }
      actionButtonSlot={
        <Suspense>
          <ActionButtonSlot />
        </Suspense>
      }
      editorSlot={
        <Suspense>
          <EditorSlot />
        </Suspense>
      }
    />
  );
}
