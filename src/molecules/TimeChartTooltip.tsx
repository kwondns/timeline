import { formattingDateDiff } from '@/lib/utils/date';
import { useLocale, useTranslations } from 'next-intl';

export default function TimeChartTooltip({ active, payload, label }: any) {
  const t = useTranslations('Time');
  const locale = useLocale();
  if (active && payload && payload.length) {
    const { titles } = payload[0].payload;
    return (
      <div className="card min-w-[200px] bg-neutral/50 p-4 shadow-xl backdrop-blur-xl">
        <p>{label}</p>
        <p>{`${t('chartActivities')}: ${payload[0].value}`}</p>
        <p>{`${t('chartTime')}: ${formattingDateDiff(payload[1].value, locale)}`}</p>
        {payload[0].payload.titles[0] !== null ? (
          <div className="mt-2 flex flex-col-reverse">
            {titles.map((title: string, index: number) => (
              <p key={`${payload[0].payload.id}_${title}_${index}`} className=" text-2xl">
                {title}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}
