import Giscus from "@/components/post/Giscus";
import components from "@/components/post/mdx";
import PostContentsContainer from "@/containers/post/PostContentsContainer";
import PostSeriesContainer from "@/containers/post/PostSeriesContainer";
import PostSideTOCContainer from "@/containers/post/PostSideTOCContainer";
import { getAllPosts, getPost, getSeries } from "@/services/posts.service";
import { getMetadata } from "@/utils/getMetadata";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return await getAllPosts().then((posts) =>
    posts.map((post) => {
      return {
        slug: [post.category, post.href],
      };
    })
  );
}
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

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("title", title);
  return getMetadata({
    title,
    description,
    ogImage: ogUrl.toString(),
  });
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
      <div className="w-full flex gap-[5%]">
        <PostContentsContainer data={data} />
        <PostSideTOCContainer />
      </div>
      <Giscus />
      {!!serieses.length && (
        <PostSeriesContainer
          series={data.frontmatter.series!}
          title={data.frontmatter.title}
          list={serieses}
        />
      )}
    </>
  );
}
