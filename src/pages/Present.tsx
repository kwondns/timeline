import { QueryClient } from '@tanstack/react-query';

import { FullContainer } from '@/components';
import { PresentTemplate } from '@/templates';
import { PresentType } from '@/types';
import { usePresent } from '@/hooks';

export function Present() {
  return (
    <FullContainer className="ml-[100vw]">
      <PresentTemplate />
    </FullContainer>
  );
}
export const presentLoader = (queryClient: QueryClient) => async (): Promise<PresentType.PresentType> => {
  const queryPreset = usePresent.usePresent();
  return queryClient.getQueryData(queryPreset.queryKey) ?? (await queryClient.fetchQuery(queryPreset));
};