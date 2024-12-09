import { getAllPosts } from "@/services/posts.service.velite";
import BigTitle from "@/components/common/BigTitle";
import SearchListContainer from "@/containers/search/SearchListContainer";
import { getMetadata } from "@/utils/getMetadata";

export function generateStaticParams() {
  return [];
}

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { query } = await searchParams;
  return getMetadata({
    title: `검색 결과 ${query ? decodeURI(query) : ""}`,
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams;
  const list = getAllPosts();
  return (
    <>
      <BigTitle text={query ? decodeURI(query) : "Search"} />
      <div className="mb-10" />
      <SearchListContainer list={list} query={query} />
    </>
  );
}
