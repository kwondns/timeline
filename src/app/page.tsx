import { redirect, RedirectType } from 'next/navigation';

export default function Page() {
  return redirect('/present', RedirectType.replace);
}
