import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getAllPosts } from "@/services/posts.service";
export const dynamic = "force-static";
export async function generateStaticParams() {
  return [];
}
type Props = {
  params: Promise<{ slug?: string[] }>;
};
export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const list = await getAllPosts().then((list) =>
    slug
      ? list.filter((item) =>
          item.title.toLowerCase().includes(slug[0].toLowerCase())
        )
      : list
  );
  return (
    <>
      <BigTitle text={slug ? decodeURI(slug[0]) : "Search"} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
