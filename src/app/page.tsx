import Signboard from "@/components/common/Signboard";
import MainContentsContainer from "@/containers/home/MainContentsContainer";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import { getAllTags } from "@/services/posts.service";

export default async function Home() {
  const tags = await getAllTags();
  return (
    <>
      <section className="w-full flex flex-col items-center gap-10">
        <Signboard />
        <TagsListContainer tags={tags} />
      </section>
      <div className="w-full flex flex-col md:flex-row gap-8 my-10">
        <MainContentsContainer />
        <div className="flex-[1] flex flex-col gap-10">
          <aside>About Me</aside>
        </div>
      </div>
    </>
  );
}
