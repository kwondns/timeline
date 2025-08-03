import FutureTemplate, { FutureTemplateProps } from '@/templates/Future.template';

const Mock: FutureTemplateProps['futureBoxs'] = [
  {
    id: 'b13fb255-6865-4def-95a6-126565eff7f9',
    title: 'test check 1',
    order: 3,
    checked: false,
    futures: [
      {
        id: 'babeb8fe-030f-4b8c-ae91-cbc5df16b89e',
        content: 'test future check 1',
        checked: false,
        priority: 1,
      },
      {
        id: '6d4d9bb6-a1b4-48e4-9b60-5023db870b2c',
        content: 'test future check 2',
        checked: false,
        priority: 2,
      },
      {
        id: 'b76a7d93-21cd-4b92-b601-d8c9ad022001',
        content: 'test future check 3',
        checked: false,
        priority: 3,
      },
    ],
  },
  {
    id: 'e4d31344-ab68-4a23-adeb-75092584c3fb',
    title: 'test updated 1',
    order: 2,
    checked: false,
    futures: [
      {
        id: '1e90a8ad-8592-4610-9da7-92ba680dad3d',
        content: 'test updated 1',
        percentage: 5,
      },
    ],
  },
  {
    id: 'd88c4f07-cf61-44c2-b74d-c230977ec18a',
    title: 'Test',
    order: 1,
    checked: false,
    futures: [],
  },
];
export default function Page() {
  return <FutureTemplate futureBoxs={Mock} />;
}
