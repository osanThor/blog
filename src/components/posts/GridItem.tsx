import Link from "next/link";
import React from "react";
import Img from "../common/Img";
import { Post } from "#site/content";

type Props = {
  item: Post;
};
export default function GridItem({ item }: Props) {
  return (
    <li className="group flex flex-col content-visibility-auto contain-intrinsic-size-[auto_1000px]">
      <Link
        href={`/post/${item.category}/${item.href}`}
        className="flex flex-col transition-all flex-grow"
      >
        {!!item.cover && (
          <div className="overflow-hidden rounded-lg mb-2 relative">
            <Img
              className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200 aspect-[5/3]"
              src={item.cover}
              alt={`cover-of-${item.title}`}
              width={350}
              height={220}
              placeholder="blur"
              blurDataURL={item.blurDataURL}
            />
          </div>
        )}
        <span className="text-xs md:text-sm font-medium text-yellow-600">
          {item.tags.join(" & ")}
        </span>
        <h2 className="text-xl font-bold mb-2 text-pretty flex-grow flex">
          {item.title}
        </h2>
        <div className="w-full flex items-center gap-2 justify-between">
          <span className="text-xs md:text-sm font-medium text-neutral-500 ">
            {item.date}
          </span>
        </div>
      </Link>
    </li>
  );
}
