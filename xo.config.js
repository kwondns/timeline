export default {
  space: 2, // 2칸 들여쓰기 사용
  semicolon: true, // 세미콜론 사용
  react: true, // React 규칙 활성화
  prettier: 'compat', // Prettier와 충돌하는 규칙 비활성화
  extends: ['next/core-web-vitals'],
  rules: {
    'unicorn/filename-case': 'off', // Next.js 파일명 규칙 완화
    'react/jsx-sort-props': 'off', // props 정렬 강제 해제
  },
  ignores: ['.next/**', 'out/**', 'node_modules/**'],
};
