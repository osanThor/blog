import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { CompileOptions } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import { cache } from "react";
import getBlurImage from "@/utils/getBlurImage";

export type Frontmatter = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  cover: string;
  category: string;
  series?: string;
  featured?: boolean;
};
export type PostItem = Frontmatter & { href: string; blurDataURL: string };
export type SeriesItem = {
  name: string;
  count: number;
};
export type TagItem = { name: string; count: number };

// 파일을 검색할 기본 경로 설정
const baseDir = path.join(process.cwd(), "src/posts");

// 공통 유틸리티 함수
const readMDXFile = async (filePath: string) => {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`Failed to read file "${filePath}":`, error);
    throw error;
  }
};

// MDX 파일 컴파일
const compileMDXFile = async (
  filePath: string,
  mdxOptions?: Omit<CompileOptions, "outputFormat" | "providerImportSource"> & {
    useDynamicImport?: boolean;
  },
  components?: React.ComponentProps<typeof MDXProvider>["components"]
) => {
  const content = await readMDXFile(filePath);
  return await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions,
    },
    components,
  });
};

// 단일 포스트 가져오기
export const getPost = async (
  filename: string[],
  mdxOptions?: CompileOptions,
  components?: React.ComponentProps<typeof MDXProvider>["components"]
) => {
  const filePath = path.join(baseDir, ...filename);
  return compileMDXFile(filePath, mdxOptions, components);
};

// 카테고리별 포스트 가져오기
export const getPostsByCategory = cache(
  async (category: string): Promise<PostItem[]> => {
    const folderPath = path.join(baseDir, category);
    try {
      const files = await fs.readdir(folderPath);
      const mdxFiles = files.filter((file) => path.extname(file) === ".mdx");

      const posts = await Promise.all(
        mdxFiles.map(async (filename) => {
          const filePath = path.join(folderPath, filename);
          const { frontmatter } = await compileMDXFile(filePath);
          return {
            href: filename.replace(".mdx", ""),
            blurDataURL: await getBlurImage(frontmatter.cover),
            ...frontmatter,
          };
        })
      );

      return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error(`Error fetching posts for category "${category}":`, error);
      return [];
    }
  }
);

// 모든 포스트 가져오기
export const getAllPosts = cache(async (): Promise<PostItem[]> => {
  const categories = ["dev", "life"];
  const postsByCategory = await Promise.all(categories.map(getPostsByCategory));
  return postsByCategory
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// 시리즈 데이터 가져오기
export const getAllSeries = async (folder?: string): Promise<SeriesItem[]> => {
  const posts = folder ? await getPostsByCategory(folder) : await getAllPosts();
  const seriesCount = posts.reduce((map, { series }) => {
    if (series) map.set(series, (map.get(series) || 0) + 1);
    return map;
  }, new Map<string, number>());

  return Array.from(seriesCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// 특정 시리즈 가져오기
export const getSeries = async (name?: string): Promise<PostItem[]> => {
  if (!name) return [];
  const posts = await getAllPosts();
  return posts.filter((post) => post.series === name);
};

// 태그 데이터 가져오기
export const getAllTags = async (): Promise<TagItem[]> => {
  const posts = await getAllPosts();
  const tagCount = posts.reduce((map, { tags }) => {
    tags.forEach((tag) => map.set(tag, (map.get(tag) || 0) + 1));
    return map;
  }, new Map<string, number>());

  return Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// 특정 태그 포스트 가져오기
export const getPostsByTag = async (tag: string): Promise<PostItem[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
};

// 추천 포스트 가져오기
export const getFeaturedPost = async (): Promise<PostItem[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, 4);
};

// 타이틀 검색 가져오기
export const getSearchPosts = async (keyword: string) => {
  const list = await getAllPosts();
  if (!keyword) return list;
  return list.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );
};
