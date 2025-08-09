import { Input } from '@/components/ui/input';

type NameFieldProps = {
  onChange: (v: string) => void;
  action: () => Promise<void>;
};
export default function NameField(props: NameFieldProps) {
  const { onChange, action } = props;
  return (
    <div className="grid gap-3 mt-6">
      <div className="flex items-center">
        <label htmlFor="name">이름</label>
      </div>
      <Input
        id="name"
        placeholder="이름 입력"
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') action();
        }}
        required
      />
    </div>
  );
}
