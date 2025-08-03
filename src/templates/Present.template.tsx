'use client';

import Container from '@/atoms/Container';
import PresentInfo from '@/organisms/PresentInfo';
import Editor from '@/molecules/Editor';

export default function PresentTemplate() {
  return (
    <Container direction="column" className="h-full px-4 pt-8">
      <PresentInfo from={new Date('2025/08/02 14:23:32')} onTempSave={() => {}} onSave={() => {}} />
      <Editor />
    </Container>
  );
}
