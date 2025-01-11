import {
  getAllTags,
  getFeaturedPost,
  getPostsPaginated,
} from "@/services/posts.service.velite";
import Signboard from "@/components/common/Signboard";
import AsideContainer from "@/containers/home/AsideContainer";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import SlideCard from "@/components/common/SlideCard";
import PostsListContainer from "@/containers/posts/PostsListContainer";

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const posts = getPostsPaginated(currentPage);
  const tags = getAllTags();
  const featured = getFeaturedPost();

  return (
    <>
      <section className="w-full flex flex-col items-center gap-4 sm:gap-10">
        <Signboard />
        <TagsListContainer tags={tags} />
      </section>
      <div className="w-full flex flex-col md:flex-row gap-8 my-10">
        <div className="w-full md:w-4/6 flex flex-col gap-10">
          <section>
            <SlideCard list={featured} />
          </section>
          <PostsListContainer list={posts.data} total={posts.total} />
        </div>
        <AsideContainer />
      </div>
    </>
  );
}
