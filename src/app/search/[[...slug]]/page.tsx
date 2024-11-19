import BigTitle from "@/components/common/BigTitle";

type Props = {
  params: { slug?: string[] };
};
export default function SearchPage({ params: { slug } }: Props) {
  return (
    <div>
      <BigTitle text={slug ? slug[0] : "Search"} />
      SearchPage {slug}
    </div>
  );
}
