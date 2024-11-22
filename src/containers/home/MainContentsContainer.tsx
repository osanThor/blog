import { PostItem, getAllPosts } from "@/services/posts.service";
import PostsListContainer from "../posts/PostsListContainer";
import SlideCard from "@/components/common/SlideCard";

export default async function MainContentsContainer({
  featured,
}: {
  featured: PostItem[];
}) {
  const list = await getAllPosts();
  return (
    <div className="w-full md:w-4/6 flex flex-col gap-10">
      <section>
        <SlideCard list={featured} />
      </section>
      <PostsListContainer list={list} />
    </div>
  );
}
