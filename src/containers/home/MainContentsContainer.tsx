import { getAllPosts } from "@/services/posts.service";
import PostsListContainer from "../posts/PostsListContainer";

export default async function MainContentsContainer() {
  const list = await getAllPosts();
  return (
    <div className="flex-[2] flex flex-col gap-10">
      <section>카드 슬라이드</section>
      <PostsListContainer list={list} />
    </div>
  );
}
