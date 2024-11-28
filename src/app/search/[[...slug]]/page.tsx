import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service";
export const dynamicParams = true;
export async function generateStaticParams() {
  return [{ slug: [""] }];
}

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const list = await getSearchPosts(slug ? decodeURI(slug[0]) : "");
  return (
    <>
      <BigTitle text={slug ? decodeURI(slug[0]) : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
