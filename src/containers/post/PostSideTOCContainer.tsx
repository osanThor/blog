"use client";

import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeadingType = "H2" | "H3" | "H4";
type Item = {
  tag: HeadingType;
  id: string;
  text: string;
};

export default function PostSideTOCContainer() {
  const headElRef = useRef<HTMLElement[]>([]);
  const [headItem, setHeadItem] = useState<Item[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  const extractHeadings = (containerId: string): Item[] => {
    const container = document.getElementById(containerId);
    if (!container) return [];
    const headings = Array.from(
      container.querySelectorAll<HTMLElement>("h2, h3, h4")
    );
    headElRef.current = headings;
    return headings.map((heading) => ({
      tag: heading.tagName as HeadingType,
      id: heading.id || "",
      text: heading.textContent?.trim() || "",
    }));
  };

  useEffect(() => {
    setHeadItem(extractHeadings("viewer"));
    const handleScroll = () => {
      if (!headElRef.current.length) return;
      const scrollY = window.scrollY;

      for (let i = 0; i < headElRef.current.length; i++) {
        const target =
          headElRef.current[i].getBoundingClientRect().top + scrollY;
        const nextTarget = headElRef.current[i + 1]
          ? headElRef.current[i + 1].getBoundingClientRect().top + scrollY
          : null;
        console.log(i, target, nextTarget, scrollY);
        const isInRange =
          scrollY >= target - 90 && (!nextTarget || scrollY < nextTarget - 90);

        if (isInRange) {
          setCurrentIdx(i);
          return;
        }
      }
      setCurrentIdx(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) transformVisible(containerRef.current);
      if (listRef.current)
        transformVisible(Array.from(listRef.current.children), 1, "left");
    },
    { scope: containerRef, dependencies: [headItem] }
  );

  return (
    <div
      ref={containerRef}
      className="min-w-[25%] w-[25%] hidden md:flex flex-col opacity-0"
    >
      <aside className="w-full h-full max-h-[70vh] sticky top-[90px] left-0">
        <h3 className="text-lg font-semibold mb-2">In This Page</h3>
        <div className="flex flex-col max-h-[calc(70vh-36px)] overflow-y-auto">
          <ul
            ref={listRef}
            className="border-l border-neutral-200 dark:border-neutral-500 px-2"
          >
            {!!headItem.length ? (
              headItem.map((item, idx) => {
                const headingClass = {
                  H2: "text-base",
                  H3: "text-sm pl-2",
                  H4: "text-xs pl-4",
                }[item.tag];

                return (
                  <li
                    key={`toc-item-${item.id}`}
                    className={`${headingClass} my-2 opacity-0`}
                  >
                    <Link
                      href={`#${item.id}`}
                      className={`${
                        idx === currentIdx ? "text-yellow-600" : ""
                      } transition-all duration-200 hover:underline`}
                    >
                      {item.text}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="my-2 opacity-0">선택자가 없습니다</li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}
