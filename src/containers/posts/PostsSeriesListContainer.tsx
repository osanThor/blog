"use client";
import SmallTitle from "@/components/common/SmallTitle";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

type CountType = { name: string; count: number };

type Props = {
  list: CountType[];
};

export default function PostsSeriesListContainer({ list }: Props) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useGSAP(
    async () => {
      if (ref.current) await transformVisible(ref.current, { time: 0.4 });
      if (listRef.current)
        await transformVisible(Array.from(listRef.current.children), {
          direction: "left",
        });
    },
    { scope: ref }
  );
  return (
    <>
      <section ref={ref} className="mb-10">
        <SmallTitle text={"Series"} count={list.length} />
        {!!list.length ? (
          <ul ref={listRef} className="flex gap-8 flex-wrap">
            {list.map((item) => (
              <li
                key={`${item.name}`}
                className="group flex flex-col opacity-0"
              >
                <Link
                  href={`/series/${item.name.replaceAll(" ", "_")}`}
                  className="flex flex-col transition-all flex-grow relative text-lg font-bold group-hover:underline"
                >
                  {item.name}
                  <sup className="absolute top-0 -right-5 text-xs">
                    ({item.count})
                  </sup>
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
