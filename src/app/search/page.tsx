import { getSearchPosts } from "@/services/posts.service.velite";
import dynamic from "next/dynamic";

const BigTitle = dynamic(() => import("@/components/common/BigTitle"));
const PostsGridContainer = dynamic(
  () => import("@/containers/posts/PostsGridContainer")
);

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams;
  const list = getSearchPosts(query ? decodeURI(query) : "");
  return (
    <>
      <BigTitle text={query ? decodeURI(query) : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
