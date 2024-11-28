import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getAllPosts } from "@/services/posts.service";
export const dynamic = "force-static";
export async function generateStaticParams() {
  return [];
}

export default async function SearchPage() {
  const list = await getAllPosts();
  return (
    <>
      <BigTitle text={"Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
