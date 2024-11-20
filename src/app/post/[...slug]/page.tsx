import components from "@/components/post/mdx";
import PostTopContainer from "@/containers/post/PostTopContainer";
import { getPost } from "@/services/posts.service";
import { getMetadata } from "@/utils/getMetadata";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const category = slug[0];
  const filename = slug[1];
  const {
    frontmatter: { title, description },
  } = await getPost([category, `${filename}.mdx`]);
  return getMetadata({ title, description });
}

export default async function PostDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const category = slug[0];
  const filename = slug[1];
  const data = await getPost(
    [category, filename ? `${filename}.mdx` : ""],
    {
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
    components
  );
  return (
    <>
      <PostTopContainer data={data.frontmatter} />
      <div className="text-pretty">{data.content}</div>
    </>
  );
}
