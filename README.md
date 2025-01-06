# Front End Developer Given's PORTFOLIO

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Next-000000?style=flat&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat&logo=Tailwindcss&logoColor=white"/>

## 블로그를 만든 이유

사실 이전에도 블로그를 만들어 본적이 있습니다. 그러나 당시에는 CMS단에서 동적으로 데이터를 관리하고 노출하는 SSR 방식으로 개발하여 DB와 클라우드에 제한이 있었습니다. (금전적인...)

그래서 디자인도 성능도 업그레이드 하고 싶습니다.

> [이전 블로그](https://given-log.vercel.app/)

## 1. 개발 환경 (Package 설정)

### Next

정적 컨텐츠를 다루는 사이트이므로 Static 렌더링(SSG)을 지원하고 여러 개발자들과 교류하고 싶어서 SEO를 중요하게 생각했습니다. 정적 컨텐츠 특화인 Gatsby와 만능인 Next 중 고민하다 이번에 Next가 15버젼으로 업그레이드 되면서 Turbo를 지원한다기에 적용하게 되었습니다. SWC를 지원하는 Vercel에서 빌드 및 배포 시간 역시 1분 안팍으로 매우 짧아졌습니다.

### Typescript

Typescript는 Javascript의 슈퍼셋으로 Typescript에서 제공하는 강력한 정적 타입 시스템은 개발 안정성을 높일 뿐만 아니라 유지보수성 등 개발 경험(DX)를 제공합니다. 개발 에디터인 VSCode(Visual Studio Code) 역시 Typescript로 만들어 졌으며 코드 네비게이션, 리펙토링 등에 도움을 주어 개발 속도를 높였습니다.

### Tailwind CSS

Tailwind CSS는 완전한 유틸리티 클래스를 지원하여 CSS-IN-JS 보다 HTML에 명시적이고 네임스페이스 오염을 방지하며 tailwind.config.js로 간편하게 커스텀 그리고 간편한 다크모드 지원등 이점이 많고 npm 트렌드에서도 대세이기 때문에 선택하게 되었습니다.

## 2. 구현 기능

### ✨ UI/UX 기능

- [x] 반응형 디자인
- [x] theme 변경
- [x] interaction 컴포넌트
- [x] 슬라이드 기능

### 🔥 필수 기능

- [x] `mdx` 파일 컨텐츠 렌더링
- [x] 시리즈, 태그 기능
- [x] 검색 기능
- [x] `TOC`
- [x] 댓글 기능
- [x] SEO 최적화
- [x] open graph
- [x] rss
- [x] lazy image
- [x] Google Analytics 적용
