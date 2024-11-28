import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service";
export const dynamic = "force-static";
export async function generateStaticParams() {
  return [];
}
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const keyword = decodeURI(slug);
  const list = await getSearchPosts(keyword);
  return (
    <>
      <BigTitle text={keyword || "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
