"use client";

import { Post } from "#site/content";
import { useEffect, useState } from "react";
import PostsGridContainer from "../posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service.velite";

export default function SearchListContainer({
  list,
  query,
}: {
  list: Post[];
  query?: string;
}) {
  const [posts, setPosts] = useState<Post[]>(list);
  useEffect(() => {
    setPosts(getSearchPosts(query));
  }, [query]);
  return <PostsGridContainer list={posts} />;
}
