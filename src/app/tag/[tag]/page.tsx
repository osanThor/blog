import { getAllTags, getPostsByTag } from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import BigTitle from "@/components/common/BigTitle";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tag.name,
  }));
}

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return getMetadata({ title: `${decodeURI(tag).replaceAll("_", " ")} 태그` });
}

export default async function PostsByTagsPage({ params }: Props) {
  const { tag } = await params;
  const convertedTag = decodeURI(tag).replaceAll("_", " ");
  const tags = getAllTags();
  const list = getPostsByTag(convertedTag);

  return (
    <>
      <div className="w-full flex items-center justify-center sm:pt-6 h-[84px] mb-4 sm:mb-10">
        <BigTitle text={`#${convertedTag}`} />
      </div>
      <TagsListContainer currentTag={convertedTag} tags={tags} />
      <div className="mb-20" />
      <PostsGridContainer list={list} />
    </>
  );
}
