import PostsListContainer from "../posts/PostsListContainer";
import SlideCard from "@/components/common/SlideCard";
import { Post, posts } from "#site/content";
export default async function MainContentsContainer({
  featured,
}: {
  featured: Post[];
}) {
  return (
    <div className="w-full md:w-4/6 flex flex-col gap-10">
      <section>
        <SlideCard list={featured} />
      </section>
      <PostsListContainer list={posts} />
    </div>
  );
}
