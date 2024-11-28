import Signboard from "@/components/common/Signboard";
import AsideContainer from "@/containers/home/AsideContainer";
import MainContentsContainer from "@/containers/home/MainContentsContainer";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import { getAllTags, getFeaturedPost } from "@/services/posts.service.velite";

export default function Home() {
  const tags = getAllTags();
  const featured = getFeaturedPost();

  return (
    <>
      <section className="w-full flex flex-col items-center gap-10">
        <Signboard />
        <TagsListContainer tags={tags} />
      </section>
      <div className="w-full flex flex-col md:flex-row gap-8 my-10">
        <MainContentsContainer featured={featured} />
        <AsideContainer />
      </div>
    </>
  );
}
