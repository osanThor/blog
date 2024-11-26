import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import { getAllSeries, getSeries } from "@/services/posts.service";
import { getMetadata } from "@/utils/getMetadata";

export async function generateStaticParams() {
  return await getAllSeries().then((series) =>
    series.map((s) => ({ series: s.name }))
  );
}
type Props = {
  params: Promise<{ series: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { series } = await params;
  return getMetadata({
    title: `${decodeURI(series).replaceAll("-", " ")} 시리즈`,
  });
}

export default async function SeriesPage({ params }: Props) {
  const { series } = await params;
  const list = await getSeries(decodeURI(series).replaceAll("-", " "));

  return (
    <>
      <BigTitle text={decodeURI(series).replaceAll("-", " ")} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
