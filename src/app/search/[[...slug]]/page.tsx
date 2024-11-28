import BigTitle from "@/components/common/BigTitle";
import SearchListContainer from "@/containers/search/SearchListContainer";
export const dynamicParams = true;
export async function generateStaticParams() {
  return [{ slug: [""] }];
}

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <BigTitle text={slug ? decodeURI(slug[0]) : "Search"} />
      <div className="mb-10" />
      <SearchListContainer query={slug ? decodeURI(slug[0]) : ""} />
    </>
  );
}
