'use client';

import { useActionState } from 'react';
import { useActionWithToast } from '@/hooks/useActionWithToast';

type FormWrapperProps = {
  serverAction: (_: any, formData: FormData) => Promise<boolean>;
  children: React.ReactNode;
  type?: 'sign' | 'create';
};

export default function FormWrapper(props: FormWrapperProps) {
  const { serverAction, children, type = 'create' } = props;
  const [state, action, isPending] = useActionState(serverAction, false);
  useActionWithToast(isPending, state, type);

  return <form action={action}>{children}</form>;
}
