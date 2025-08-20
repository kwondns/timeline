import Container from '@/atoms/Container';
import { Card } from '@/components/ui/card';
import React from 'react';

type PresentInfoProps = {
  indicatorSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  presentTimeSlot: React.ReactNode;
  actionButtonSlot: React.ReactNode;
};

export default function PresentInfo(props: PresentInfoProps) {
  const { indicatorSlot, titleSlot, presentTimeSlot, actionButtonSlot } = props;
  return (
    <Card className="gap-4 px-6 pt-6 bg-info-foreground/20 border-info/20">
      <Container className="justify-between items-center">{indicatorSlot}</Container>
      {titleSlot}
      <Container className="justify-between gap-6 items-center">
        {presentTimeSlot}
        {actionButtonSlot}
      </Container>
    </Card>
  );
}
