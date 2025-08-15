import Container from '@/atoms/Container';
import PresentClientTemplate from '@/templates/PresentClient.template';
import PresentInfo from '@/organisms/PresentInfo';

export type PresentTemplateProps = {
  indicatorSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  presentTimeSlot: React.ReactNode;
  actionButtonSlot: React.ReactNode;
  editorSlot: React.ReactNode;
  title: string | null;
  startTime: string | null;
  content: string | null;
};

export default function PresentTemplate(props: PresentTemplateProps) {
  const { indicatorSlot, presentTimeSlot, titleSlot, actionButtonSlot, editorSlot, title, startTime, content } = props;
  return (
    <PresentClientTemplate title={title} startTime={startTime} initialContent={content}>
      <Container direction="column" className="h-full px-2 pt-4 md:px-4 md:pt-8">
        <PresentInfo
          indicatorSlot={indicatorSlot}
          presentTimeSlot={presentTimeSlot}
          titleSlot={titleSlot}
          actionButtonSlot={actionButtonSlot}
        />
        <Container className="h-full w-full flex-1 overflow-auto pt-4">{editorSlot}</Container>
      </Container>
    </PresentClientTemplate>
  );
}
