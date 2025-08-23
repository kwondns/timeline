import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

type NameFieldProps = {
  onChange: (v: string) => void;
  action: () => Promise<void>;
};
export default function NameField(props: NameFieldProps) {
  const { onChange, action } = props;
  const t = useTranslations('SignUp.Name');
  return (
    <div className="grid gap-3 mt-6">
      <div className="flex items-center">
        <label htmlFor="name">{t('userName')}</label>
      </div>
      <Input
        id="name"
        placeholder={t('namePlaceholder')}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') action();
        }}
        required
      />
    </div>
  );
}
