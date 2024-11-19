import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";

export const getPost = async () => {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts/dev", "blog.mdx"),
    "utf-8"
  );
  return await compileMDX<{ title: string; description: string }>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });
};

// 파일을 검색할 기본 경로 설정
const baseDir = path.join(process.cwd(), "src/posts");

export const getPostsByCategory = cache(async (folder: string) => {
  const folderPath = path.join(baseDir, folder);
  try {
    const files = await fs.readdir(folderPath);
    return files.filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Error reading folder "${folder}":`, error);
    return [];
  }
});

export const getAllPosts = async () => {};

// // dev와 life 폴더의 mdx 파일 목록 가져오기
// const devFiles = getMdxFiles("dev");
// const lifeFiles = getMdxFiles("life");
