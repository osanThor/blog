import { getAllPosts } from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import SearchContainer from "@/components/search/SearchContainer";
import { Suspense } from "react";
import SpinnerIcon from "@/components/common/icons/SpinnerIcon";

type Props = {
  searchParams?: Promise<{ query?: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const query = await searchParams;
  return getMetadata({
    title: `검색 결과 ${query?.query || ""}`,
  });
}

export default function SearchPage() {
  const list = getAllPosts();
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center">
          <SpinnerIcon />
        </div>
      }
    >
      <SearchContainer list={list} />
    </Suspense>
  );
}
