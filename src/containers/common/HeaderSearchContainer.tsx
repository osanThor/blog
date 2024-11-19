"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import useDebounce from "@/hooks/debounde";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function HeaderSearchContainer() {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const debouncedValue = useDebounce(value);

  const handelChangeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMoveSearch();
  };

  const handleMoveSearch = () => {
    router.push(`/search/${value}`);
  };

  useEffect(() => {
    debouncedValue && handleMoveSearch();
  }, [debouncedValue]);

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[170px] bg-neutral-100 dark:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-600 px-4 h-8 rounded-[32px] placeholder:text-sm focus:outline-none transition-all duration-200"
          type="text"
          placeholder="검색어를 입력해주세요."
          onFocus={() => router.push("/search")}
          value={value || ""}
          onChange={handelChangeFields}
        />
      </form>
      <ThemeToggle />
    </div>
  );
}
export default React.memo(HeaderSearchContainer);
