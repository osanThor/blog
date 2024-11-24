import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSearchPosts } from "@/services/posts.service";

type Props = {
  params: Promise<{ slug?: string[] }>;
};
export default async function SearchPage(props: Props) {
  const { slug } = await props.params;
  const keyword = slug ? decodeURI(slug[0]) : "";
  const list = await getSearchPosts(keyword);
  return (
    <>
      <BigTitle text={slug ? keyword : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
