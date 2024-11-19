import { getPost } from "@/services/posts.service";
import { getMetadata } from "@/utils/getMetadata";

export async function generateMetadata() {
  const {
    frontmatter: { title, description },
  } = await getPost();
  return getMetadata({ title, description });
}

export default async function PostDetailPage() {
  const data = await getPost();
  return (
    <>
      <h1>{data.frontmatter.title}</h1>
      <div>{data.content}</div>
    </>
  );
}
