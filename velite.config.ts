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
      category: s.enum(["dev", "life"]),
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

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
  },
});
