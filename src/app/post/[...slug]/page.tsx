import components from "@/components/post/mdx";
import PostContentsContainer from "@/containers/post/PostContentsContainer";
import PostSeriesContainer from "@/containers/post/PostSeriesContainer";
import { getPost, getSeries } from "@/services/posts.service";
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
  const postPromise = getPost(
    [category, filename ? `${filename}.mdx` : ""],
    {
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
    components
  );
  const seriesPromise = postPromise.then((data) =>
    getSeries(data.frontmatter.series)
  );
  const [data, serieses] = await Promise.all([postPromise, seriesPromise]);

  return (
    <>
      <PostContentsContainer data={data} />
      {!!serieses.length && (
        <PostSeriesContainer title={data.frontmatter.series!} list={serieses} />
      )}
    </>
  );
}
