import PastMock from '@/mocks/time.mock';
import TimeTemplate from '@/templates/Time.template';

export default function Page() {
  return <TimeTemplate pasts={PastMock} />;
}
