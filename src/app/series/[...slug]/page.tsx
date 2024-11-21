import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getSeries } from "@/services/posts.service";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = decodeURI(slug[0]).replaceAll("-", " ");

  const list = await getSeries(series);

  return (
    <>
      <BigTitle text={decodeURI(series).replaceAll("-", " ")} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
