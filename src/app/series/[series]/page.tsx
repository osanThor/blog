import { getAllSeries, getSeries } from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import dynamic from "next/dynamic";

const BigTitle = dynamic(() => import("@/components/common/BigTitle"));
const PostsGridContainer = dynamic(
  () => import("@/containers/posts/PostsGridContainer")
);

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s.name }));
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
  const list = getSeries(decodeURI(series).replaceAll("-", " "));

  return (
    <>
      <BigTitle text={decodeURI(series).replaceAll("-", " ")} />
      <div className="mb-10" />
      <PostsGridContainer list={list} />
    </>
  );
}
