import PastTemplate from '@/templates/Past.template';
import Mock from '@/mocks/pastActivity.mock';

export default function Page() {
  const date = new Date().toLocaleDateString('ko-kr').split('/').join('');
  return <PastTemplate date={date} activities={Mock} />;
}
