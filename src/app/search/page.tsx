import { getSearchPosts } from "@/services/posts.service.velite";
import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getMetadata } from "@/utils/getMetadata";

export function generateStaticParams() {
  return [];
}

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { query } = await searchParams;
  return getMetadata({
    title: `검색 결과 ${query || ""}`,
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams;
  const list = getSearchPosts(query);
  return (
    <>
      <BigTitle text={query ? query : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
