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
  useGSAP(
    async () => {
      if (ref.current) await transformVisible(ref.current, { time: 0.4 });
    },
    { scope: ref, dependencies: [list] }
  );
  return (
    <>
      <section ref={ref}>
        <SmallTitle text={"Posts"} count={list.length} />
        {!!list.length ? (
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
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
