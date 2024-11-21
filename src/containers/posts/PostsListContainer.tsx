"use client";
import SmallTitle from "@/components/common/SmallTitle";
import { PostItem } from "@/services/posts.service";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  list: PostItem[];
};

export default function PostsListContainer({ list }: Props) {
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
      <section ref={ref}>
        <SmallTitle text={"All Posts"} count={list.length} />
        {!!list.length ? (
          <ul ref={listRef} className="flex flex-col gap-10">
            {list.map((item) => (
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
                    <p className="flex flex-grow mb-4 min-h-10">
                      {item.description}
                    </p>
                    <div className="w-full flex items-center gap-2 justify-between">
                      <span className="text-xs md:text-sm font-medium text-neutral-500 ">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden w-full max-w-[12vw] min-w-[30%] max-h-[140px] rounded-lg mb-2 relative flex items-center justify-center">
                    <Image
                      className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200"
                      src={item.cover}
                      alt={`cover-of-${item.title}`}
                      width={200}
                      height={80}
                      sizes={"1"}
                      priority
                    />
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
