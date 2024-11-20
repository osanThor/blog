import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { CompileOptions } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import { cache } from "react";

export type Frontmatter = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  cover?: string;
};
export type PostItem = Frontmatter & { href: string };
// 파일을 검색할 기본 경로 설정
const baseDir = path.join(process.cwd(), "src/posts");

export const getPost = async (
  filename: string[],
  mdxOptions?: Omit<CompileOptions, "outputFormat" | "providerImportSource"> & {
    useDynamicImport?: boolean | undefined;
  },
  components?: React.ComponentProps<typeof MDXProvider>["components"]
) => {
  const content = await fs.readFile(path.join(baseDir, ...filename), "utf-8");
  return await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions,
    },
    components,
  });
};

export const getPostsByCategory = cache(
  async (folder: string): Promise<PostItem[]> => {
    const folderPath = path.join(baseDir, folder);
    try {
      const files = await fs
        .readdir(folderPath)
        .then((files) => files.filter((file) => path.extname(file) === ".mdx"));
      return await Promise.all(
        files.map(async (filename) => {
          const formatFileName = filename.replace(".mdx", "");
          const { frontmatter } = await getPost([folder, filename]);
          return {
            href: formatFileName,
            ...frontmatter,
          };
        })
      ).then((arr) =>
        arr.sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate > bDate ? -1 : 1;
        })
      );
    } catch (error) {
      console.error(`Error reading folder "${folder}":`, error);
      return [];
    }
  }
);

export const getAllPosts = async () => {};

// // dev와 life 폴더의 mdx 파일 목록 가져오기
// const devFiles = getMdxFiles("dev");
// const lifeFiles = getMdxFiles("life");