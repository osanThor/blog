import BigTitle from "@/components/common/BigTitle";
import { getPostsByCategory } from "@/services/posts.service";

type Props = {
  params: { slug: string[] };
};
export default async function PostsByCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0];
  const list = await getPostsByCategory(category);
  return (
    <div>
      <BigTitle text={slug ? slug[0] : ""} />
      {list.map((name) => (
        <div>{name}</div>
      ))}
    </div>
  );
}
