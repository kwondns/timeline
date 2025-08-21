# Timeline

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=fff)

[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000?)](https://timeline.example.com)
[![Vercel Status](https://img.shields.io/github/deployments/kwondns/timeline/Production?label=vercel&logo=vercel)](https://time.kwondns.com)
![GitHub Commit Activity (branch)](https://img.shields.io/github/commit-activity/m/kwondns/timeline)
![GitHub repo size](https://img.shields.io/github/repo-size/kwondns/timeline)

<p align="center">
  <img width="1470" height="906" alt="image" src="https://github.com/user-attachments/assets/229052e2-7869-422a-97c9-77c9387a038b" />
</p>

## 목차

1. [소개](#소개)
2. [데모](#데모)
3. [주요 기능](#주요-기능)
4. [기술 스택](#기술-스택)
5. [설치 및 실행](#설치-및-실행)
6. [사용 예시](#사용-예시)
7. [환경 변수](#환경-변수)
8. [로드맵](#로드맵)

## 소개

Timeline은 ‘무엇을 했지?’, ‘무엇을 해야 하지?’라는 고민에서 출발하여
일정과 작업을 시간 흐름 기준으로 시각화하는 Next.js 기반 웹 애플리케이션입니다.

## 데모
- 웹: [Timeline](https://time.kwondns.com) (반응형 지원)


## 🚀 주요 기능

- 📅 인터랙티브 타임라인 인터페이스
- 🎨 모던한 UI/UX (Radix UI + shadcn/ui)
- 🌙 다크/라이트 테마 지원
- 📱 반응형 디자인
- ⚡ 최적화된 성능 (Vercel Analytics)
- 🔐 인증 시스템
- 📝 마크다운 에디터 지원

## 🛠️ 기술 스택

- **Frontend**: React 19.1.0, Next.js 15.4.2-canary.44
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.1.11
- **UI Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Authentication**: Jose (JWT)
- **Validation**: Zod
- **Icons**: Lucide React, React Icons
- **API Server**: Nest.js

    > Next.js의 PPR(Partial PreRender)을 사용하기 위해 canary 버전을 사용했습니다.
    > 
    > 해당 기능으로 한 페이지에서도 정적 쉘(HTML + RSC Payload) 동적 데이터(Fetch)를 사용 할 수 있습니다.

## 📦 설치 및 실행

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn

```shell
# 의존성 설치
npm install

# 또는
yarn install
```

### 개발 서버 실행

```shell
npm run dev
# 또는
yarn dev
```

## 사용 예시

<p align="center">
  <img width="45%" alt="img_1" src="https://github.com/user-attachments/assets/d7197b79-8b3c-4e0f-a214-b35fcdfdb690" />
  <img width="45%" alt="img" src="https://github.com/user-attachments/assets/fa0b10ec-c571-4354-b032-af056fd240f0" />
</p>

<p align="center">
  <img width="1422" height="911" alt="image" src="https://github.com/user-attachments/assets/227943d4-d481-4483-b9c1-6950870c3a2c" />
</p>
### 챗봇 (작업 요약 및 검색)
<p align="center">
  <img width="300" src="https://github.com/user-attachments/assets/183fe83e-a65e-4638-9804-2739ec9eb5f3" />
</p>



## 🔧 환경 변수
```dotenv
API_SERVER_URL=https://api.server.com
SESSION_SECRET=jwt_secret
NEXT_PUBLIC_IMAGE_URL=Image.url
NEXT_PUBLIC_CHATBOT_URL=https://Chatbot
DEMO_EMAIL=demo@email.com
DEMO_PASSWORD=demo_password!@
```

## 🛣️ 로드맵
- [x] 기본 타임라인 뷰
- [x] 다크/라이트 테마
- [ ] 소셜 로그인 지원
- [ ] 팀 협업 기능  
