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
  cover: string;
  series?: string;
  category: string;
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

export const getAllPosts = cache(async (): Promise<PostItem[]> => {
  const devPosts = await getPostsByCategory("dev");
  const lifePosts = await getPostsByCategory("life");

  return JSON.parse(
    JSON.stringify(
      [...devPosts, ...lifePosts].sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate > bDate ? -1 : 1;
      })
    )
  );
});

export type SeriesItem = {
  name: string;
  count: number;
};

export const getAllSeriesByCategory = async (
  folder: string
): Promise<SeriesItem[]> => {
  const seriesMap = new Map<string, number>();
  const list = await getPostsByCategory(folder).then((list) =>
    list.filter((item) => !!item.series)
  );
  list.forEach((item) => {
    if (item.series)
      seriesMap.set(item.series, (seriesMap.get(item.series) || 0) + 1);
  });
  return Array.from(seriesMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const getSeries = async (name: string) => {
  return await getAllPosts().then((data) =>
    data.filter((item) => item.series && item.series === name)
  );
};

export type TagItem = { name: string; count: number };

export const getAllTags = async (): Promise<TagItem[]> => {
  const tagMap = new Map<string, number>();
  const list = await getAllPosts();

  list.forEach((item) => {
    item.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

export const getPostsByTag = async (name: string) => {
  return await getAllPosts().then((data) =>
    data.filter((item) => item.tags.includes(name))
  );
};
