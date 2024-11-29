import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service.velite";
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ searchParams: { query: "" } }];
}
type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { query = "" } = await searchParams;
  const list = getSearchPosts(decodeURI(query));
  return (
    <>
      <BigTitle text={query ? decodeURI(query) : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
