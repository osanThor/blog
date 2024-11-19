import BigTitle from "@/components/common/BigTitle";

type Props = {
  params: { slug?: string[] };
};
export default async function PostsByCategoryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <BigTitle text={slug ? slug[0] : ""} />
    </div>
  );
}
