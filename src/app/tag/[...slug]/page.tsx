import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import { getAllTags, getPostsByTag } from "@/services/posts.service";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsByTagsPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];
  const convertedTag = decodeURI(tag).replaceAll("-", " ");
  const [tags, list] = await Promise.all([
    getAllTags(),
    getPostsByTag(convertedTag),
  ]);
  return (
    <>
      <div className="w-full flex items-center justify-center pt-6 h-[84px] mb-10">
        <BigTitle text={`#${convertedTag}`} />
      </div>
      <TagsListContainer currentTag={convertedTag} tags={tags} />
      <div className="mb-20" />
      <PostsGridContainer list={list} />
    </>
  );
}
