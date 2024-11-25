"use client";

import { Frontmatter } from "@/services/posts.service";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import { CompileMDXResult } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  data: CompileMDXResult<Frontmatter>;
};
export default function PostContentsContainer({
  data: { frontmatter, content },
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (ref.current)
        transformVisible(Array.from(ref.current.children), 0.5, "left", 0.15);
    },
    { scope: ref }
  );
  return (
    <article ref={ref} className="w-full md:w-[70%]  max-w-full flex-1 mb-7 ">
      <div
        id="postCoverImg"
        className="mb-10 overflow-hidden rounded-xl max-h-[500px] flex items-center justify-center"
      >
        <Image
          className="object-cover w-full"
          src={frontmatter.cover}
          alt={`${frontmatter.title}-cover`}
          width={800}
          height={300}
          priority
        />
      </div>
      <ul className="flex items-center gap-2 mb-4">
        {frontmatter.tags.map((tag) => (
          <li key={`post-tag-${tag}`}>
            <Link
              href={`/tag/${tag.replaceAll(" ", "-")}`}
              className="flex text-sm py-1 px-2 rounded bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white transition-all"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
        {frontmatter.title}
      </h1>
      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-2">
        {frontmatter.description}
      </p>
      <div className="text-sm flex items-center gap-1 pb-2 md:pb-4  mb-9 text-neutral-600 dark:text-neutral-300">
        <span>
          Written by <b>Given</b> at
        </span>
        <span className="font-medium">{frontmatter.date}</span>
      </div>
      <div id="viewer" className="text-pretty">
        {content}
      </div>
    </article>
  );
}
