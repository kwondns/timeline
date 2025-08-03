import FutureTemplate from '@/templates/Future.template';
import Mock from '@/mocks/future.mock';

export default function Page() {
  return <FutureTemplate futureBoxs={Mock} />;
}
