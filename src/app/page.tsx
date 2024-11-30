import {
  getAllPosts,
  getAllTags,
  getFeaturedPost,
} from "@/services/posts.service.velite";
import dynamic from "next/dynamic";
const Signboard = dynamic(() => import("@/components/common/Signboard"));
const SlideCard = dynamic(() => import("@/components/common/SlideCard"));
const PostsListContainer = dynamic(
  () => import("@/containers/posts/PostsListContainer")
);
const TagsListContainer = dynamic(
  () => import("@/containers/tags/TagsListContainer")
);
const AsideContainer = dynamic(
  () => import("@/containers/home/AsideContainer")
);

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const featured = getFeaturedPost();

  return (
    <>
      <section className="w-full flex flex-col items-center gap-10">
        <Signboard />
        <TagsListContainer tags={tags} />
      </section>
      <div className="w-full flex flex-col md:flex-row gap-8 my-10">
        <div className="w-full md:w-4/6 flex flex-col gap-10">
          <section>
            <SlideCard list={featured} />
          </section>
          <PostsListContainer list={posts} />
        </div>
        <AsideContainer />
      </div>
    </>
  );
}
