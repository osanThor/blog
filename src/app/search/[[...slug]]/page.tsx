import BigTitle from "@/components/common/BigTitle";

type Props = {
  params: Promise<{ slug?: string[] }>;
};
export default async function SearchPage(props: Props) {
  const params = await props.params;

  const { slug } = params;

  return (
    <div>
      <BigTitle text={slug ? decodeURI(slug[0]) : "Search"} />
    </div>
  );
}
