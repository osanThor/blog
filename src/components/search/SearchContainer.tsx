"use client";

import { Post } from "#site/content";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { useEffect, useState } from "react";
import BigTitle from "../common/BigTitle";
import { useSearchParams } from "next/navigation";
import { getSearchPosts } from "@/services/posts.service.velite";

type Props = {
  list: Post[];
};

export default function SearchContainer({ list: serverList }: Props) {
  const searchparams = useSearchParams();
  const query = searchparams.get("query");
  const [list, setList] = useState<Post[]>(serverList);

  useEffect(() => {
    setList(getSearchPosts(query));
  }, [query]);

  return (
    <>
      <BigTitle text={query ? query : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
