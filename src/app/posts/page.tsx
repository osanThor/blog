import {
  getAllSeries,
  getPostsPaginated,
} from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import BigTitle from "@/components/common/BigTitle";
import PostsGridContainer from "@/containers/posts/PostsGridContainer";
import PostsSeriesListContainer from "@/containers/posts/PostsSeriesListContainer";

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata() {
  return getMetadata({ title: "POSTS 기록" });
}

export default async function PostsPage({ searchParams }: Props) {
  const page = await searchParams;
  const currentPage = Number(page?.page) || 1;
  const series = getAllSeries();
  const posts = getPostsPaginated(currentPage, 12);

  return (
    <>
      <BigTitle text="posts" />
      <p className="mb-7 text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-300">
        새로 알게 된 지식, 트러블 슈팅 등 개발 일지와 소소한 일상을 기록한 공간입니다.
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
