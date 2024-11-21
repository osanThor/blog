"use client";

import { Frontmatter } from "@/services/posts.service";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Frontmatter;
};
export default function PostTopContainer({ data }: Props) {
  return (
    <div className="w-full pb-2 md:pb-4 mb-7">
      <div className="mb-10 overflow-hidden rounded-xl max-h-[500px] flex items-center justify-center">
        <Image
          className="object-cover w-full"
          src={data.cover}
          alt={`${data.title}-cover`}
          width={800}
          height={38}
          priority
        />
      </div>
      <ul className="flex items-center gap-2 mb-4">
        {data.tags.map((tag) => (
          <li key={`post-tag-${tag}`}>
            <Link
              href={"/"}
              className="flex text-sm py-1 px-2 rounded bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white transition-all"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
        {data.title}
      </h1>
      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-2">
        {data.description}
      </p>
      <div className="text-sm flex items-center gap-1 mb-2 text-neutral-600 dark:text-neutral-300">
        <span>
          Written by <b>Given</b> at
        </span>
        <span className="font-medium">{data.date}</span>
      </div>
    </div>
  );
}
