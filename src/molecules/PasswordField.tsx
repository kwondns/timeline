import { Input } from '@/components/ui/input';

type PasswordFieldProps = {
  onChangePassword: (v: string) => void;
  onChangePasswordConfirm: (v: string) => void;
};
export default function PasswordField(props: PasswordFieldProps) {
  const { onChangePassword, onChangePasswordConfirm } = props;
  return (
    <div className="grid gap-3">
      <div className="flex items-center">
        <label htmlFor="password">Password</label>
      </div>
      <Input
        id="password"
        type="password"
        placeholder="Password 입력"
        onChange={(e) => onChangePassword(e.currentTarget.value)}
        required
      />
      <Input
        id="password-confirm"
        type="password"
        placeholder="Password 확인"
        onChange={(e) => onChangePasswordConfirm(e.currentTarget.value)}
        required
      />
    </div>
  );
}
