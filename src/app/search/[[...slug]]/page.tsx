import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service";
import { PageProps } from "../../../../.next/types/app/page";

export default async function SearchPage({ params }: PageProps) {
  const { slug } = await params;
  const list = await getSearchPosts(slug);
  return (
    <>
      <BigTitle text={slug ? decodeURI(slug[0]) : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
