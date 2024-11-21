import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = {
  type: "h2" | "h3" | "h4";
} & PropsWithChildren;

export default function Heading({ type, children, ...rest }: Props) {
  const content = typeof children === "string" ? children : null;

  const HeadingTag = type;
  const headingClass = {
    h2: "text-3xl font-extrabold mt-10",
    h3: "text-2xl font-extrabold mt-8",
    h4: "text-xl font-extrabold mt-4",
  }[type];

  return (
    <HeadingTag
      id={content?.replaceAll(" ", "-") || undefined}
      className={`${headingClass} group`}
      {...rest}
    >
      {children}
      {content && <HeadingLink to={content} />}
    </HeadingTag>
  );
}

function HeadingLink({ to }: { to: string }) {
  return (
    <Link
      href={`#${to.replaceAll(" ", "-")}`}
      className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-yellow-600 hover:text-yellow-500"
    >
      #
    </Link>
  );
}
