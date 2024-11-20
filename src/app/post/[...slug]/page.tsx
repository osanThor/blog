import { getPost } from "@/services/posts.service";
import { getMetadata } from "@/utils/getMetadata";
import type { PropsWithChildren } from "react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    [category, `${filename}.mdx`],
    {
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
    {
      p: (props: PropsWithChildren) => (
        <p className="my-2 leading-6" {...props} />
      ),
      ul: (props: PropsWithChildren) => (
        <ul className="my-2 leading-6 list-disc pl-4" {...props} />
      ),
      ol: (props: PropsWithChildren) => (
        <ul className="my-2 leading-6 list-decimal pl-4" {...props} />
      ),
      a: (props: PropsWithChildren) => {
        return (
          <a
            className="font-bold text-neutral-600 dark:text-neutral-400 hover:underline"
            {...props}
          ></a>
        );
      },
      hr: () => <hr className="my-4" />,
      code: ({
        className,
        inline,
        children,
        ...props
      }: PropsWithChildren & { className?: string; inline?: boolean }) => {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            language={match[1]}
            PreTag="div"
            className="rounded-lg"
            {...props}
            style={gruvboxDark}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code
            className="bg-neutral-800 text-white px-2 py-[3px] rounded text-sm"
            {...props}
          >
            {children}
          </code>
        );
      },
    }
  );
  return (
    <>
      <h1>{data.frontmatter.title}</h1>
      <div>{data.content}</div>
    </>
  );
}
