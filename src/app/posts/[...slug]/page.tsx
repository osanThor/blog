import {
  getAllSeries,
  getPostsByCategoryPaginated,
} from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import PostsSeriesListContainer from "@/containers/posts/PostsSeriesListContainer";

export function generateStaticParams() {
  return [{ slug: ["dev"] }, { slug: ["life"] }];
}
type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{
    page?: string;
  }>;
};

const messages = {
  dev: "새로 알게 된 지식, 트러블 슈팅 등 개발 일지를 기록한 공간입니다.",
  life: "소소한 일상 모음입니다.",
};
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = slug[0];
  return getMetadata({ title: `${category.toUpperCase()} 기록` });
}

export default async function PostsByCategoryPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const page = await searchParams;
  const currentPage = Number(page?.page) || 1;
  const category = slug[0];
  const series = getAllSeries(category);
  const posts = getPostsByCategoryPaginated(category, currentPage);

  return (
    <>
      <BigTitle text={category} />
      <p className="mb-7 text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-300">
        {messages[category as "dev" | "life"]}
      </p>
      {!!series.length && <PostsSeriesListContainer list={series} />}
      <PostsGridContainer
        list={posts.data}
        total={posts.total}
        totalPages={posts.totalPages}
      />
    </>
  );
}
