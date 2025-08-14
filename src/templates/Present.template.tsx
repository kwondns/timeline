import Container from '@/atoms/Container';
import PresentClientTemplate from '@/templates/PresentClient.template';

export type PresentTemplateProps = {
  presentInfoSlot: React.ReactNode;
  editorSlot: React.ReactNode;
  title: string | null;
  startTime: string | null;
  content: string | null;
};

export default function PresentTemplate(props: PresentTemplateProps) {
  const { presentInfoSlot, editorSlot, title, startTime, content } = props;
  return (
    <PresentClientTemplate title={title} startTime={startTime} initialContent={content}>
      <Container direction="column" className="h-full px-4 pt-8">
        {presentInfoSlot}
        {editorSlot}
      </Container>
    </PresentClientTemplate>
  );
}
