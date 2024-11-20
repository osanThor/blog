"use client";

import React from "react";

type Props = {
  text: string;
  count?: number;
};
function SmallTitle({ text, count }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <h2 className="text-2xl md:text-3xl font-black uppercase mb-3 text-wrap truncate">
        {text}
      </h2>
      {!!count && (
        <span className="text-sm md:text-base font-bold mb-8">{`(${count})`}</span>
      )}
      <span className="ml-4 flex-1 inline-block h-[1px] bg-neutral-300 dark:bg-neutral-500" />
    </div>
  );
}
export default React.memo(SmallTitle);
