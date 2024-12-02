"use client";

import { Post } from "#site/content";
import Img from "@/components/common/Img";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  data: Post;
};
export default function PostContentsContainer({
  data: { cover, title, description, date, tags, blurDataURL, img },
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current)
        transformVisible(Array.from(ref.current.children), 0.5, "left", 0.15);
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="w-full">
      <div
        id="postCoverImg"
        className="mb-10 overflow-hidden rounded-xl max-h-[500px] flex items-center justify-center opacity-0"
      >
        <Img
          className="object-cover w-full"
          src={cover}
          alt={`${title}-cover`}
          width={750}
          height={img.height}
          priority
          blurDataURL={blurDataURL}
        />
      </div>
      <ul className="flex items-center gap-2 mb-4 opacity-0">
        {tags.map((tag) => (
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
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 opacity-0">
        {title}
      </h1>
      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-2 opacity-0">
        {description}
      </p>
      <div className="text-sm flex items-center gap-1 pb-2 md:pb-4  mb-9 text-neutral-600 dark:text-neutral-300 opacity-0">
        <span>
          Written by <b>Given</b> at
        </span>
        <span className="font-medium">{date}</span>
      </div>
    </div>
  );
}
