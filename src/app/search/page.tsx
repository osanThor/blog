import BigTitle from "@/components/common/BigTitle";
import SearchListContainer from "@/containers/search/SearchListContainer";

type Props = {
  searchParams: Promise<{ query: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams;
  return (
    <>
      <BigTitle text={query ? decodeURI(query) : "Search"} />
      <div className="mb-10" />
      <SearchListContainer query={query} />
    </>
  );
}
