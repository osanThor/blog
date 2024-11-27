import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service";

export const revalidate = 10;

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const keyword = slug && slug[0] ? decodeURI(slug[0]) : "";
  const list = await getSearchPosts(keyword);
  return (
    <>
      <BigTitle text={slug ? keyword : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
