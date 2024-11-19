import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
};

export const getPost = async (
  filename: string,
  mdxOptions?: any,
  components?: any
) => {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts/dev", `${filename}.mdx`),
    "utf-8"
  );
  return await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions,
    },
    components,
  });
};

// 파일을 검색할 기본 경로 설정
const baseDir = path.join(process.cwd(), "src/posts");

export const getPostsByCategory = cache(async (folder: string) => {
  const folderPath = path.join(baseDir, folder);
  try {
    const files = await fs
      .readdir(folderPath)
      .then((files) => files.filter((file) => path.extname(file) === ".mdx"));
    return await Promise.all(
      files.map(async (filenames) => {
        const formatFileName = filenames.replace(".mdx", "");
        const { frontmatter } = await getPost(formatFileName);
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
});

export const getAllPosts = async () => {};

// // dev와 life 폴더의 mdx 파일 목록 가져오기
// const devFiles = getMdxFiles("dev");
// const lifeFiles = getMdxFiles("life");
