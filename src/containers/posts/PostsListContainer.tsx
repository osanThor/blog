"use client";
import SmallTitle from "@/components/common/SmallTitle";
import ListItem from "@/components/posts/ListItem";
import { PostItem } from "@/services/posts.service";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
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
              <ListItem key={`item-${item.title}`} item={item} />
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
