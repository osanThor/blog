import { getAllSeries, getSeries } from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";

export async function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: encodeURIComponent(s.name) }));
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
  const convertedSeriesName = decodeURI(series).replaceAll("-", " ");
  const list = getSeries(convertedSeriesName);

  return (
    <>
      <BigTitle text={convertedSeriesName} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
