import { getSearchPosts } from "@/services/posts.service";
import PostsGridContainer from "../posts/PostsGridContainer";

type Props = {
  query: string;
};

export default async function SearchListContainer({ query }: Props) {
  const list = await getSearchPosts(decodeURI(query));
  return (
    <>
      <PostsGridContainer list={list} />
    </>
  );
}
