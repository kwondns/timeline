export default [
  {
    id: 'd8f80629-7526-4829-bb13-fb0ac3a2dcfd',
    title: 'Timeline 챗봇',
    content:
      '## 마이그레이션 이유\n' +
      '\n' +
      '1. 과거 페이지(예전 작업 내용)을 SSG로 변환하여 페이지를 좀 더 빠르게 로드하기 위함.\n' +
      '2. 매일 0시 일주일 이상 된 내용의 페이지는 SSG로 변환(Cron)\n' +
      '3. 일주일 미만의 페이지는 ISR로 혹시 모를 수정에 대비\n' +
      '\n' +
      '### 진행사항\n' +
      '![](https://tms-timeline.s3.ap-northeast-2.amazonaws.com/production/2025-08-01T07:28:49.430Z/2025-8-1/6ce1f9ee180b27d4.png)\n' +
      '\n' +
      '> present(현재 페이지) UI 구성\n' +
      '\n' +
      '### 예정\n' +
      '1. past 과거 페이지\n' +
      '2. past 달력 페이지\n' +
      '3. future 미래 페이지',
    startTime: '2025-07-19T15:05:00.000Z',
    endTime: '2025-07-19T19:36:52.665Z',
    created_at: '2025-07-20T01:22:45.746Z',
    updated_at: '2025-07-20T01:22:45.746Z',
  },
  {
    id: '890880a8-213b-454d-8d3d-94338d1f9264',
    title: 'RAG',
    content:
      '## LangChain\n\nlangchain-core -> 모든 컴포넌트 기본 추상화\n\nlangchain -> 애플리케이션의 구성\n\n## Chain\n여러...',
    startTime: '2025-07-20T10:22:54.956Z',
    endTime: '2025-07-20T14:28:02.068Z',
    created_at: '2025-07-21T01:49:29.917Z',
    updated_at: '2025-07-21T01:49:29.917Z',
  },
];
