# Front End Developer Given's PORTFOLIO

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Next-000000?style=flat&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat&logo=Tailwindcss&logoColor=white"/>

## Deploy URL

[Given's Log](https://blog.given-log.com)

## 블로그를 만든 이유

사실 이전에도 블로그를 만들어 본적이 있습니다. 그러나 당시에는 CMS단에서 동적으로 데이터를 관리하고 노출하는 SSR 방식으로 개발하여 DB와 클라우드에 제한이 있었습니다. (금전적인...)

그래서 디자인도 성능도 업그레이드 하고 싶습니다.

> [이전 블로그](https://given-log.vercel.app/)

## 1. ⚙️ 개발 환경 (Package 설정)

### Next

정적 컨텐츠를 다루는 사이트이므로 Static 렌더링(SSG)을 지원하고 여러 개발자들과 교류하고 싶어서 SEO를 중요하게 생각했습니다. 정적 컨텐츠 특화인 Gatsby와 만능인 Next 중 고민하다 이번에 Next가 15버젼으로 업그레이드 되면서 Turbo를 지원한다기에 적용하게 되었습니다. SWC를 지원하는 Vercel에서 빌드 및 배포 시간 역시 1분 안팍으로 매우 짧아졌습니다.

### Typescript

Typescript는 Javascript의 슈퍼셋으로 Typescript에서 제공하는 강력한 정적 타입 시스템은 개발 안정성을 높일 뿐만 아니라 유지보수성 등 개발 경험(DX)를 제공합니다. 개발 에디터인 VSCode(Visual Studio Code) 역시 Typescript로 만들어 졌으며 코드 네비게이션, 리펙토링 등에 도움을 주어 개발 속도를 높였습니다.

### Tailwind CSS

Tailwind CSS는 완전한 유틸리티 클래스를 지원하여 CSS-IN-JS 보다 HTML에 명시적이고 네임스페이스 오염을 방지하며 tailwind.config.js로 간편하게 커스텀 그리고 간편한 다크모드 지원등 이점이 많고 npm 트렌드에서도 대세이기 때문에 선택하게 되었습니다.

## 2. 📚 구현 기능

### ✨ UI/UX 기능

- [x] 반응형 디자인
- [x] theme 변경
- [x] interaction 컴포넌트
- [x] 슬라이드 기능

### ⭐️ 필수 기능

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

## 3. 🌝 개발 이슈

### 1. 정적 컨텐츠

정적 컨텐츠를 NextJS에서 다룰 때 크게 세가지를 사용할 수 있습니다. `@next/mdx` 사용한 방식이 있는데 필요한 포스팅마다 페이지를 만들어 줘야하는 것이 마음에 들지 않았습니다. 자세히 보실려면 [여기](https://blog.given-log.com/post/dev/20241120-make-blog2#MDX-%EB%A0%8C%EB%8D%94%EB%A7%81-57)를 클릭해주세요. 그리하여 node의 fs를 사용하여 확장자 mdx 파일을 읽어와 뿌려주는 방식으로 구현했습니다. mdx를 사용한 이유는 저만의 커스텀 컴포넌트와 호환을 시켜주기 위해 선택했습니다. 그러나 fs로 파일을 읽어오는 방식이 개발 환경시 사용 경험이 좋지 못해 마크다운 형식의 글을 다루는 라이브러리에 대해 알아보게 되었습니다.

그러다 알게 된 Velite와 Contentlayer

두 라이브러리는 모두 기존에 사용한 mdx 파일을 호환하며 더욱 간단하게 데이터 추상화가 가능합니다. 그리고 추상화 레이어를 제공해주는 라이브러리이므로 Next에도 호환이 잘 되는 것을 알 수 있습니다.
npm trends에 따르면 Velite와 Contentlayer는 다운로드 수에 차이가 큽니다. Contentlayer가 많지요. 그러나 데이터의 타입을 제공하고 마크다운 파일의 내용까지 스키마로 정의되며 지속적으로 업데이트 중인 Velite를 선택하게 되었습니다. Contentlayer는 2년전이 마지막 업데이트입니다(2025년기준)

### 2. 최적화

성능 최적화에 대한 고민을 담은 포스팅은 [여기](https://blog.given-log.com/post/dev/20241128-make-blog3)를 보시면 됩니다.
