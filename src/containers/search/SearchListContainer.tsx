import { getSearchPosts } from "@/services/posts.service";
import PostsGridContainer from "../posts/PostsGridContainer";

type Props = {
  query: string;
};

export default async function SearchListContainer({ query }: Props) {
  console.time();
  const list = await getSearchPosts(decodeURI(query) || "");
  console.timeEnd();
  return (
    <>
      <PostsGridContainer list={list} />
    </>
  );
}
