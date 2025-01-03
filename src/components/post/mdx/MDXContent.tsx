import * as runtime from "react/jsx-runtime";
import { PropsWithChildren } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Heading from "./Heading";
import Blockquote from "./Blockquote";

const sharedComponents = {
  img: (props: PropsWithChildren) => <img className="my-4" {...props} />,
  p: (props: PropsWithChildren) => <p className="mt-4 leading-8" {...props} />,
  ul: (props: PropsWithChildren) => (
    <ul className="mt-4 leading-6 list-disc pl-6" {...props} />
  ),
  ol: (props: PropsWithChildren) => (
    <ul className="mt-4 leading-6 list-decimal pl-6" {...props} />
  ),
  li: (props: PropsWithChildren) => (
    <li className="mt-2 leading-6" {...props} />
  ),
  a: (props: PropsWithChildren) => {
    return (
      <a
        className="font-bold text-yellow-600 dark:text-yellow-400 hover:underline"
        {...props}
      ></a>
    );
  },
  br: () => <br className="leading-4 h-4" />,
  hr: () => <hr className="my-4" />,
  table: (props: PropsWithChildren) => (
    <table className="w-full my-4" {...props} />
  ),
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
        className="rounded-lg mt-4"
        {...props}
        style={gruvboxDark}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        className="bg-neutral-500 text-yellow-300 px-2 py-[3px] rounded text-sm relative -translate-y-[2px]"
        {...props}
      >
        {children}
      </code>
    );
  },
  Heading,
  Blockquote,
};

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};
