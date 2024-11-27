import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const keyword = slug && slug[0] ? decodeURIComponent(slug[0]) : "";
  const listPromise = getSearchPosts(keyword);
  const list = await listPromise;
  return (
    <>
      <BigTitle text={slug ? keyword : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
