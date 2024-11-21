import BigTitle from "@/components/common/BigTitle";
import TagsListContainer from "@/containers/tags/TagsListContainer";
import { getAllTags } from "@/services/posts.service";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsByTagsPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];
  const convertedTag = decodeURI(tag).replaceAll("-", " ");
  const tags = await getAllTags();

  return (
    <>
      <div className="w-full flex items-center justify-center pt-6 h-[84px]">
        <BigTitle text={`#${convertedTag}`} />
      </div>
      <div className="mb-10" />
      <TagsListContainer currentTag={convertedTag} tags={tags} />
    </>
  );
}
