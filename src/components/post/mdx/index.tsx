import { PropsWithChildren } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  p: (props: PropsWithChildren) => <p className="mt-4 leading-6" {...props} />,
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
};

export default components;
