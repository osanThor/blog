"use client";
import { Post } from "#site/content";
import SmallTitle from "@/components/common/SmallTitle";
import GridItem from "@/components/posts/GridItem";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type Props = {
  list: Post[];
};

export default function PostsGridContainer({ list }: Props) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useGSAP(
    async () => {
      if (ref.current) await transformVisible(ref.current, 0.4);
      if (listRef.current)
        await transformVisible(Array.from(listRef.current.children), null);
    },
    { scope: ref, dependencies: [list] }
  );
  return (
    <>
      <section ref={ref}>
        <SmallTitle text={"Posts"} count={list.length} />
        {!!list.length ? (
          <ul
            ref={listRef}
            className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
          >
            {list.map((item) => (
              <GridItem key={`item-${item.title}`} item={item} />
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
