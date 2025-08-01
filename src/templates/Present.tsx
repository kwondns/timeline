'use client';

import Container from '@/atoms/Container';
import PresentInfo from '@/organisms/PresentInfo';
import Editor from '@/molecules/Editor';

export default function Present() {
  return (
    <Container direction="column" className="h-full">
      <PresentInfo from={''} to={''} diff={''} onTempSave={() => {}} onSave={() => {}} />
      <Editor />
    </Container>
  );
}
