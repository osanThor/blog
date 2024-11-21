"use client";
import SmallTitle from "@/components/common/SmallTitle";
import { PostItem } from "@/services/posts.service";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  category: string;
  list: PostItem[];
};

export default function PostsGridContainer({ category, list }: Props) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      if (ref.current) transformVisible(ref.current, 0.4);
      if (listRef.current)
        transformVisible(Array.from(listRef.current.children), 1);
    },
    { scope: ref }
  );
  return (
    <>
      <section ref={ref}>
        <SmallTitle text={"All Posts"} count={list.length} />
        {!!list.length ? (
          <ul
            ref={listRef}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
          >
            {list.map((item) => (
              <li
                key={item.title}
                className="group flex flex-col content-visibility-auto contain-intrinsic-size-[auto_1000px]"
              >
                <Link
                  href={`/post/${category}/${item.href}`}
                  className="flex flex-col transition-all flex-grow"
                >
                  {!!item.cover && (
                    <div className="overflow-hidden h-[100vw] max-h-[300px] sm:max-h-[230px] lg:max-h-[210px] rounded-lg mb-2 relative">
                      <Image
                        className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200"
                        src={item.cover}
                        alt={`cover-of-${item.title}`}
                        fill
                        sizes={"1"}
                        priority
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
