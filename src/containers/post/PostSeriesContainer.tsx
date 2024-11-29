"use clinet";

import { Post } from "#site/content";
import Img from "@/components/common/Img";
import Link from "next/link";

type Props = {
  series: string;
  title: string;
  list: Post[];
};
export default function PostSeriesContainer({ series, title, list }: Props) {
  return (
    <div className="w-full mb-10 mt-5">
      <div className="text-xl font-bold flex items-center gap-2 mb-5">
        시리즈
        <Link
          href={`/series/${series.replaceAll(" ", "-")}`}
          className="hover:underline"
        >
          {series}
          <sup className="text-sm">({list.length})</sup>
        </Link>
      </div>
      <ul className="flex flex-col gap-10">
        {list.map((item) => {
          const isSamePost = title === item.title;
          return (
            <li
              key={item.title}
              className="group flex flex-col content-visibility-auto contain-intrinsic-size-[auto_1000px]"
            >
              <Link
                href={`/post/${item.category}/${item.href}`}
                className="flex transition-all gap-7"
              >
                <div className="overflow-hidden w-full max-w-[10vw] min-w-[20%] max-h-[140px] rounded-lg mb-2 relative flex items-center justify-center">
                  <Img
                    className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200"
                    src={item.cover}
                    alt={`cover-of-${item.title}`}
                    width={200}
                    height={100}
                    sizes={"200"}
                    blurDataURL={item.blurDataURL}
                  />
                </div>
                <div className="w-full flex flex-col flex-grow">
                  <span className="text-xs md:text-sm font-medium text-yellow-600">
                    {item.tags.join(" & ")}
                  </span>
                  <h2
                    className={`${
                      isSamePost ? "text-violet-400" : ""
                    } text-xl font-bold mb-2 text-pretty flex group-hover:text-violet-500`}
                  >
                    {item.title}
                  </h2>
                  <div className="w-full flex items-center gap-2 justify-between">
                    <span className="text-xs md:text-sm font-medium text-neutral-500 ">
                      {item.date}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
