"use client";

import { Post } from "#site/content";
import Img from "@/components/common/Img";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { transformVisible } from "@/utils/lib/gsap";

type Props = {
  data: Post;
};
export default function PostContentsContainer({
  data: { cover, title, description, date, tags, blurDataURL, img },
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    async () => {
      if (ref.current)
        await transformVisible(Array.from(ref.current.children), {
          time: 0.5,
          direction: "left",
          stagger: 0.15,
        });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="w-full">
      <div className="mb-10 overflow-hidden rounded-xl max-h-[500px] flex items-center justify-center">
        <Img
          className="object-cover w-full aspect-video"
          src={cover}
          alt={`${title}-cover`}
          width={img.width}
          height={img.height}
          priority
          sizes="(max-width: 768px) 300px, (max-width: 1200px) 600px, 400px"
          loading="eager"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <ul className="flex items-center gap-2 mb-4 opacity-0">
        {tags.map((tag) => (
          <li key={`post-tag-${tag}`}>
            <Link
              href={`/tag/${tag.replaceAll(" ", "_")}`}
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
