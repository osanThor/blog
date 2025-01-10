"use client";
import { Post } from "#site/content";
import SmallTitle from "@/components/common/SmallTitle";
import ListItem from "@/components/posts/ListItem";
import Pagination from "@/components/posts/Pagination";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, useRef } from "react";

type Props = {
  list: Post[];
  total?: number;
  page?: number;
};

export default function PostsListContainer({ list, total }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    async () => {
      if (ref.current) await transformVisible(ref.current, { time: 0.4 });
    },
    { scope: ref }
  );

  return (
    <>
      <section ref={ref}>
        <SmallTitle text={"All Posts"} count={total || list.length} />
        {!!list.length ? (
          <>
            <ul className="flex flex-col gap-10 mb-10">
              {list.map((item) => (
                <ListItem key={`item-${item.title}`} item={item} />
              ))}
            </ul>
            <Suspense>
              <Pagination total={total || list.length} />
            </Suspense>
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
