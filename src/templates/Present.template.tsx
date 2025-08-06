'use client';

import Container from '@/atoms/Container';
import PresentInfo from '@/organisms/PresentInfo';
import Editor from '@/molecules/Editor';

export type PresentTemplateProps = {
  title: string | null;
  startDate: string | null;
  content: string | null;
};

export default function PresentTemplate(props: PresentTemplateProps) {
  const { title, startDate } = props;
  return (
    <Container direction="column" className="h-full px-4 pt-8">
      <PresentInfo
        title={title}
        from={startDate ? new Date(startDate) : null}
        onTempSave={() => {}}
        onSave={() => {}}
      />
      <Editor />
    </Container>
  );
}
