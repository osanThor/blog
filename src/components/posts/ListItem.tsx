import Link from "next/link";
import React from "react";
import Img from "../common/Img";
import { Post } from "#site/content";

type Props = {
  item: Post;
};
export default function ListItem({ item }: Props) {
  return (
    <li
      key={item.title}
      className="group flex flex-col content-visibility-auto contain-intrinsic-size-[auto_1000px] opacity-0"
    >
      <Link
        href={`/post/${item.category}/${item.href}`}
        className="flex transition-all gap-7 items-start"
      >
        <div className="w-full flex flex-col">
          <span className="text-xs md:text-sm font-medium text-yellow-600">
            {item.tags.join(" & ")}
          </span>
          <h2 className="text-xl font-bold mb-2 text-pretty flex group-hover:text-violet-500">
            {item.title}
          </h2>
          <p className="flex flex-grow mb-4 min-h-10">{item.description}</p>
          <div className="w-full flex items-center gap-2 justify-between">
            <span className="text-xs md:text-sm font-medium text-neutral-500 ">
              {item.date}
            </span>
          </div>
        </div>
        <div className="overflow-hidden w-full max-w-[12vw] min-w-[30%] max-h-[140px] h-[17vw] md:h-[10vw] rounded-lg mb-2 relative flex items-center justify-center">
          <Img
            className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200"
            src={item.cover}
            alt={`cover-of-${item.title}`}
            fill
            blurDataURL={item.blurDataURL}
          />
        </div>
      </Link>
    </li>
  );
}
