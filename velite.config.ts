import remarkGfm from "remark-gfm";
import { defineConfig, defineCollection, s } from "velite";

// content/posts/{href}/index.mdx 경로에서 href 를 추출
const computedFields = <T extends { slug: string; cover: Image }>({
  cover,
  ...data
}: T) => {
  const href = data.slug.replace(/^posts\//, "");
  const { src, width, height, blurDataURL } = cover;
  return {
    ...data,
    href,
    cover: src,
    blurDataURL,
    img: { src, width, height },
  };
};

type Image = { src: string; width: number; height: number; blurDataURL: string };

const posts = defineCollection({
  name: "Post",
  pattern: "posts/*/index.mdx",
  schema: s
    .object({
      slug: s.path({ removeIndex: true }),
      title: s.string().max(99),
      description: s.string().max(999),
      tags: s.string().array(),
      date: s.string(),
      // 포스트 폴더 기준 상대경로 (ex. "./cover.png")
      cover: s.image(),
      draft: s.boolean().optional(),
      series: s.string().optional(),
      featured: s.boolean().optional(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

// resume: 목록형 데이터는 yaml, 프로젝트 상세는 mdx 로 관리
const profile = defineCollection({
  name: "Profile",
  pattern: "resume/profile.yaml",
  single: true,
  schema: s.object({
    name: s.string(),
    nameEn: s.string(),
    title: s.string(),
    intro: s.string().array(),
  }),
});

const experiences = defineCollection({
  name: "Experience",
  pattern: "resume/experience.yaml",
  schema: s.object({
    company: s.string(),
    role: s.string(),
    // "YYYY.MM" 형식, 재직 중이면 end 생략
    start: s.string(),
    end: s.string().optional(),
    summary: s.string().optional(),
    highlights: s.string().array().default([]),
    stack: s.string().array().default([]),
  }),
});

const skills = defineCollection({
  name: "Skill",
  pattern: "resume/skills.yaml",
  schema: s.object({
    category: s.string(),
    items: s.string().array(),
  }),
});

const projects = defineCollection({
  name: "Project",
  pattern: "resume/projects/*/index.mdx",
  schema: s
    .object({
      slug: s.path({ removeIndex: true }),
      title: s.string().max(99),
      summary: s.string().max(999),
      start: s.string(),
      end: s.string().optional(),
      role: s.string().optional(),
      stack: s.string().array().default([]),
      highlights: s.string().array().default([]),
      // 관련 블로그 포스트 href (content/posts/{href})
      posts: s.string().array().default([]),
      link: s.string().url().optional(),
      github: s.string().url().optional(),
      order: s.number().default(0),
      draft: s.boolean().optional(),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      href: data.slug.replace(/^resume\/projects\//, ""),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, profile, experiences, skills, projects },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
  },
});
