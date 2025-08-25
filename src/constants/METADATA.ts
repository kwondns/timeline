export const ROOT_METADATA = {
  ko: {
    title: {
      template: '%s | Timeline',
      default: 'Timeline - 시간의 흐름을 기록하다',
    },
    description:
      '개인의 과거, 현재, 미래를 시각적으로 관리하는 타임라인 애플리케이션. 일정 관리와 작업 추적을 한 눈에 확인하세요.',
    keywords: ['타임라인', 'Timeline', '일정관리', '작업관리', '시간관리', '개인 관리'],
  },
  en: {
    title: {
      template: '%s | Timeline',
      default: 'Timeline - Record the Flow of Time',
    },
    description:
      'A timeline application for visually managing your past, present, and future. Check your schedule management and task tracking at a glance.',
    keywords: ['timeline', 'schedule management', 'task management', 'time management', 'personal organization'],
  },
  ja: {
    title: {
      template: '%s | Timeline',
      default: 'Timeline - 時間の流れを記録する',
    },
    description:
      '個人の過去、現在、未来を視覚的に管理するタイムラインアプリケーション。スケジュール管理とタスク追跡を一目で確認できます。',
    keywords: ['タイムライン', 'スケジュール管理', 'タスク管理', '時間管理', '個人管理'],
  },
  fr: {
    title: {
      template: '%s | Timeline',
      default: 'Timeline - Enregistrer le Flux du Temps',
    },
    description:
      "Une application de timeline pour gérer visuellement votre passé, présent et futur. Consultez votre gestion de planning et suivi des tâches en un coup d'œil.",
    keywords: ['timeline', 'gestion de planning', 'gestion des tâches', 'gestion du temps', 'organisation personnelle'],
  },
  es: {
    title: {
      template: '%s | Timeline',
      default: 'Timeline - Registra el Flujo del Tiempo',
    },
    description:
      'Una aplicación de línea de tiempo para gestionar visualmente tu pasado, presente y futuro. Consulta tu gestión de horarios y seguimiento de tareas de un vistazo.',
    keywords: ['timeline', 'gestión de horarios', 'gestión de tareas', 'gestión del tiempo', 'organización personal'],
  },
  'zh-cn': {
    title: {
      template: '%s | Timeline',
      default: 'Timeline - 记录时间的流逝',
    },
    description: '一个可视化管理您的过去、现在和未来的时间线应用程序。一目了然地查看您的日程管理和任务跟踪。',
    keywords: ['时间线', '日程管理', '任务管理', '时间管理', '个人组织'],
  },
} as const;

export const MONTH_NAME = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  fr: [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ],
  es: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
};

export const FUTURE_METADATA = {
  title: {
    ko: '미래 계획',
    en: 'Future Plans',
    ja: '将来の計画',
    fr: 'Projets Futurs',
    es: 'Planes Futuros',
    'zh-cn': '未来计划',
  },
  description: {
    ko: '앞으로의 계획과 목표를 관리하고 추적하세요. 미래를 체계적으로 준비하는 타임라인입니다.',
    en: 'Manage and track your upcoming plans and goals. A timeline for systematically preparing for the future.',
    ja: '今後の計画と目標を管理し、追跡します。未来を体系的に準備するためのタイムラインです。',
    fr: "Gérez et suivez vos projets et objectifs à venir. Une timeline pour préparer systématiquement l'avenir.",
    es: 'Gestiona y rastrea tus planes y objetivos futuros. Una línea de tiempo para preparar sistemáticamente el futuro.',
    'zh-cn': '管理和追踪您即将到来的计划和目标。系统性地为未来做准备的时间线。',
  },
} as const;

export const PAST_METADATA = {
  title: {
    ko: '{year}년 {month}월 {day}일 기록 - Timeline',
    en: '{month} {day}, {year} Records - Timeline',
    ja: '{year}年{month}月{day}日の記록 - Timeline',
    fr: 'Archives du {day} {month} {year} - Timeline',
    es: 'Registros del {day} de {month} de {year} - Timeline',
    'zh-cn': '{year}年{month}月{day}日记录 - Timeline',
  },
  description: {
    ko: '{year}년 {month}월 {day}일의 활동과 기록을 확인하세요.',
    en: 'View your activities and records for {month} {day}, {year}.',
    ja: '{year}年{month}月{day}日の活動と記録を確認してください。',
    fr: 'Consultez vos activités et archives du {day} {month} {year}.',
    es: 'Ve tus actividades y registros del {day} de {month} de {year}.',
    'zh-cn': '查看{year}年{month}月{day}日的活动和记录。',
  },
};

export const CALENDAR_METADATA = {
  title: {
    ko: `{year}년 {month}월 일정`,
    en: `{month}/{year} Schedule`,
    ja: `{year}年{month}月のスケジュール`,
    fr: `Planning de {month} {year}`,
    es: `Horario de {month} {year}`,
    'zh-cn': `{year}年{month}月日程`,
  },
  description: {
    ko: `{year}년 {month}월의 모든 일정과 이벤트를 한눈에 확인하세요. Timeline에서 시간을 효율적으로 관리하고 계획하세요.`,
    en: `View all your schedules and events for {month} {year} at a glance. Manage your time efficiently and plan ahead with Timeline.`,
    ja: `{year}年{month}月のすべてのスケジュールとイベントを一目で確認してください。Timelineで時間を効率的に管理し、計画を立てましょう。`,
    fr: `Consultez tous vos rendez-vous et événements de {month} {year} en un coup d'œil. Gérez votre temps efficacement et planifiez à l'avance avec Timeline.`,
    es: `Ve todos tus horarios y eventos de {month} {year} de un vistazo. Administra tu tiempo de manera eficiente y planifica con Timeline.`,
    'zh-cn': `一览{year}年{month}月的所有日程和事件。使用Timeline高效管理时间并制定计划。`,
  },
};

export const TIME_METADATA = {
  title: {
    ko: '대시보드',
    en: 'Dashboard',
    ja: 'ダッシュボード',
    fr: 'Tableau de Bord',
    es: 'Panel de Control',
    'zh-cn': '仪表板',
  },
  description: {
    ko: '시간 활동 추적, 차트 분석, 미래 계획을 한눈에 볼 수 있는 타임라인 대시보드입니다.',
    en: 'A timeline dashboard where you can view time activity tracking, chart analysis, and future plans at a glance.',
    ja: '時間活動の追跡、チャート分析、将来の計画を一目で確認できるタイムラインダッシュボードです。',
    fr: "Un tableau de bord timeline où vous pouvez voir le suivi des activités temporelles, l'analyse des graphiques et les plans futurs en un coup d'œil.",
    es: 'Un panel de timeline donde puedes ver el seguimiento de actividades temporales, análisis de gráficos y planes futuros de un vistazo.',
    'zh-cn': '一个时间线仪表板，您可以一目了然地查看时间活动跟踪、图表分析和未来计划。',
  },
};
