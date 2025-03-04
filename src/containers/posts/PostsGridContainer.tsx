"use client";
import { Post } from "#site/content";
import SmallTitle from "@/components/common/SmallTitle";
import GridItem from "@/components/posts/GridItem";
import Pagination from "@/components/posts/Pagination";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, useRef } from "react";

type Props = {
  list: Post[];
  total?: number;
  totalPages?: number;
};

export default function PostsGridContainer({
  list,
  total,
  totalPages = 0,
}: Props) {
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
        <SmallTitle text={"Posts"} count={total || list.length} />
        {!!list.length ? (
          <>
            <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
              {list.map((item) => (
                <GridItem key={`item-${item.title}`} item={item} />
              ))}
            </ul>
            {totalPages > 1 && (
              <Suspense>
                <Pagination total={total || list.length} pageSize={12} />
              </Suspense>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-center h-[300px] text-lg font-medium text-neutral-600 dark:text-neutral-300">
            게시물이 없습니다.
          </div>
        )}
      </section>
    </>
  );
}
