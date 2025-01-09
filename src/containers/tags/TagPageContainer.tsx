"use client";
import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "../posts/PostsGridContainer";
import TagsListContainer from "./TagsListContainer";
import { CountType } from "@/types/post";
import { Post } from "#site/content";

type Props = {
  tag: string;
  tags: CountType[];
  list: Post[];
};

export default function TagPageContainer({ tag, tags, list }: Props) {
  return (
    <>
      <div className="w-full flex items-center justify-center pt-6 h-[84px] mb-10">
        <BigTitle text={`#${tag}`} />
      </div>
      <TagsListContainer currentTag={tag} tags={tags} />
      <div className="mb-20" />
      <PostsGridContainer list={list} />
    </>
  );
}
