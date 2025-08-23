import { Input } from '@/components/ui/input';
import InputError from '@/molecules/InputError';
import { useTranslations } from 'next-intl';

type PasswordFieldProps = {
  onChangePassword: (v: string) => void;
  onChangePasswordConfirm: (v: string) => void;
  passwordError: string | null;
  passwordConfirmError: string | null;
};
export default function PasswordField(props: Readonly<PasswordFieldProps>) {
  const t = useTranslations('SignUp.Password');
  const { onChangePassword, onChangePasswordConfirm, passwordConfirmError, passwordError } = props;
  return (
    <div className="grid gap-3">
      <div className="flex items-center">
        <label htmlFor="password">Password</label>
      </div>
      <Input
        id="password"
        type="password"
        placeholder={t('passwordPlaceholder')}
        onChange={(e) => onChangePassword(e.currentTarget.value)}
        required
      />
      <InputError value={passwordError} />
      <Input
        id="password-confirm"
        type="password"
        placeholder={t('passwordConfirmPlaceholder')}
        onChange={(e) => onChangePasswordConfirm(e.currentTarget.value)}
        required
      />
      <InputError value={passwordConfirmError} />
    </div>
  );
}
