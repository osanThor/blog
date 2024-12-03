import {
  getAllPosts,
  getAllTags,
  getFeaturedPost,
} from "@/services/posts.service.velite";
import Signboard from "@/components/common/Signboard";
import AsideContainer from "@/containers/home/AsideContainer";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import SlideCard from "@/components/common/SlideCard";

import dynamic from "next/dynamic";
const PostsListContainer = dynamic(
  () => import("@/containers/posts/PostsListContainer")
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
