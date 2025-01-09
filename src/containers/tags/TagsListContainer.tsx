"use client";

import TreeDotsIcon from "@/components/common/icons/TreeDotsIcon";
import { CountType } from "@/types/post";
import { useTagsStore } from "@/utils/lib/zustand/tags";
import Link from "next/link";

type Props = { currentTag?: string; tags: CountType[] };

const INITIAL_LENGTH = 7;

export default function TagsListContainer({ currentTag, tags }: Props) {
  const open = useTagsStore((state) => state.open);
  const setOpen = useTagsStore((state) => state.setOpen);

  const handleClickToggle = () => setOpen(!open);
  const visibleTags = open ? tags : tags.slice(0, INITIAL_LENGTH);

  return (
    <div className="w-full flex items-center justify-center border-t border-b border-neutral-300 dark:border-neutral-500">
      <ul className="w-[calc(100%-32px)] max-w-[600px] py-4 flex items-center justify-center gap-4 flex-wrap transition-all duration-200">
        {visibleTags.map((tag) => (
          <li key={`${tag.name}`}>
            <Link
              href={`/tag/${encodeURIComponent(tag.name.replaceAll(" ", "-"))}`}
              className={`${
                currentTag === tag.name ? "font-bold" : "font-medium"
              } hover:underline relative`}
            >
              {tag.name}
              <sup>({tag.count})</sup>
            </Link>
          </li>
        ))}
        <li>
          <button
            aria-label="toggleTagBtn"
            onClick={handleClickToggle}
            className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 w-6 h-6 min-w-6 min-h-6 flex items-center justify-center transition-all duration-200"
          >
            <TreeDotsIcon />
          </button>
        </li>
      </ul>
    </div>
  );
}
