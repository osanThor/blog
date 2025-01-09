import { getAllTags, getPostsByTag } from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import TagPageContainer from "@/containers/tags/TagPageContainer";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return getMetadata({ title: `${decodeURI(tag).replaceAll("-", " ")} 태그` });
}

export default async function PostsByTagsPage({ params }: Props) {
  const { tag } = await params;
  const convertedTag = decodeURI(tag).replaceAll("-", " ");
  const tags = getAllTags();
  const list = getPostsByTag(convertedTag);

  return <TagPageContainer tag={convertedTag} tags={tags} list={list} />;
}
