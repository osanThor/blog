import Giscus from "@/components/post/Giscus";
import PostContentsContainer from "@/containers/post/PostContentsContainer";
import PostSeriesContainer from "@/containers/post/PostSeriesContainer";
import PostSideTOCContainer from "@/containers/post/PostSideTOCContainer";
import {
  getAllPosts,
  getPost,
  getSeries,
} from "@/services/posts.service.velite";
import { getMetadata } from "@/utils/getMetadata";
import { MDXContent } from "@/components/post/mdx/MDXContent";
import { notFound } from "next/navigation";
import { META } from "@/constants/meta";

export function generateStaticParams() {
  return getAllPosts().map((post) => {
    return {
      slug: [post.category, post.href],
    };
  });
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const filename = slug[1];
  const data = getPost(filename);

  if (!data) notFound();

  const { title, description, category, href } = data;

  const url = META.url;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("title", title);
  return getMetadata({
    title,
    description,
    ogImage: ogUrl.toString(),
    asPath: `${url}/post/${category}/${href}`,
  });
}

export default async function PostDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const filename = slug[1];
  const data = getPost(filename);

  if (!data) notFound();

  const serieses = getSeries(data.series);

  return (
    <>
      <div className="w-full flex gap-[5%]">
        <article className="w-full md:w-[70%] max-w-full flex-1 mb-7 ">
          <PostContentsContainer data={data} />
          <div id="viewer" className="text-pretty ">
            <MDXContent code={data.content} />
          </div>
        </article>
        <PostSideTOCContainer />
      </div>
      <Giscus />
      {!!serieses.length && (
        <PostSeriesContainer
          series={data.series!}
          title={data.title}
          list={serieses}
        />
      )}
    </>
  );
}
