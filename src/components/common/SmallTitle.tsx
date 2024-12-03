"use client";

import React from "react";

type Props = {
  text: string;
  count?: number;
};
export default function SmallTitle({ text, count }: Props) {
  return (
    <div className="flex gap-2 items-center mb-7">
      <h2 className="text-xl md:text-2xl font-black capitalize text-wrap truncate">
        {text}
      </h2>
      {!!count && (
        <span className="text-xs md:text-sm font-bold mb-4">{`(${count})`}</span>
      )}
      <span className="ml-4 flex-1 inline-block h-[1px] bg-neutral-300 dark:bg-neutral-500" />
    </div>
  );
}
