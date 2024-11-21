"use client";
import SmallTitle from "@/components/common/SmallTitle";
import { SeriesItem } from "@/services/posts.service";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  category: string;
  list: SeriesItem[];
};

export default function PostsTagListContainer({ category, list }: Props) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      if (ref.current) transformVisible(ref.current, 0.4);
      if (listRef.current)
        transformVisible(Array.from(listRef.current.children), null);
    },
    { scope: ref }
  );
  return (
    <>
      <section ref={ref} className="mb-10">
        <SmallTitle text={"시리즈"} count={list.length} />
        {!!list.length ? (
          <ul ref={listRef} className="flex gap-4 ">
            {list.map((item) => (
              <li
                key={`${item.seriesName}`}
                className="group flex flex-col content-visibility-auto contain-intrinsic-size-[auto_1000px] opacity-0"
              >
                {item.seriesName}
                {/* <Link
                  href={`/post/${category}/${item.href}`}
                  className="flex flex-col transition-all flex-grow"
                ></Link> */}
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full flex items-center justify-center h-[300px] text-lg font-medium text-neutral-600 dark:text-neutral-300">
            게시물이 없습니다.
          </div>
        )}
      </section>
    </>
  );
}
