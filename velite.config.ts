import getBase64 from "@/utils/getBase64";
import remarkGfm from "remark-gfm";
import { defineConfig, defineCollection, s } from "velite";

const computedFields = async <T extends { cover: string }>(data: T) => {
  const { base64, img } = await getBase64(data.cover);
  return {
    ...data,
    blurDataURL: base64,
    img,
  };
};

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      href: s.string(),
      category: s.string(),
      tags: s.string().array(),
      date: s.string(),
      cover: s.string(),
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
