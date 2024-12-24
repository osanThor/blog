import { posts, Post } from "#site/content";
import makeCountObj from "@/utils/makeCountObj";
import { cache } from "react";

export const getAllPosts = cache((): Post[] => {
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getPost = (href: string): Post | undefined =>
  posts.find((post) => post.href === href);

export const getPostsByCategory = (category: string): Post[] =>
  getAllPosts().filter((post) => post.category === category);

export const getAllSeries = (category?: string) => {
  const list = category ? getPostsByCategory(category) : getAllPosts();
  return makeCountObj(list, "series");
};

export const getSeries = (name?: string): Post[] => {
  if (!name) return [];
  return getAllPosts().filter((item) => item.series && item.series === name);
};

export const getAllTags = () => makeCountObj(getAllPosts(), "tag");

export const getPostsByTag = (tag: string): Post[] =>
  getAllPosts().filter((item) => item.tags.includes(tag));

export const getFeaturedPost = (): Post[] =>
  getAllPosts()
    .filter((item) => item.featured === true)
    .slice(0, 4);

export const getSearchPosts = (keyword: string | null): Post[] => {
  return getAllPosts().filter((item) =>
    item.title.toLowerCase().includes(keyword ? keyword.toLowerCase() : "")
  );
};
