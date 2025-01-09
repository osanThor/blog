import { getAllTags, getPostsByTag } from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import TagsListContainer from "@/containers/tags/TagsListContainer";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const convertedTag = decodeURI(tag).replaceAll("-", " ");
  return getMetadata({ title: `태그 ${convertedTag}` });
}
export default async function PostsByTagsPage({ params }: Props) {
  const { tag } = await params;
  const tags = getAllTags();
  const list = getPostsByTag(decodeURI(tag).replaceAll("-", " "));
  return (
    <>
      <div className="w-full flex items-center justify-center pt-6 h-[84px] mb-10">
        <BigTitle text={`#${decodeURI(tag).replaceAll("-", " ")}`} />
      </div>
      <TagsListContainer tags={tags} />
      <div className="mb-20" />
      <PostsGridContainer list={list} />
    </>
  );
}
