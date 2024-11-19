"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import useDebounce from "@/hooks/debounde";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

function HeaderSearchContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const handleFocus = useCallback(() => {
    if (!pathname.startsWith("/search")) {
      router.push("/search");
    }
  }, [pathname]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim()) router.push(`/search/${value.trim()}`);
    },
    [value]
  );

  useEffect(() => {
    if (pathname.startsWith("/search"))
      router.push(`/search/${debouncedValue}`);
  }, [debouncedValue]);

  useEffect(() => {
    if (!pathname.startsWith("/search")) setValue("");
  }, [pathname]);

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[170px] bg-neutral-100 dark:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-600 px-4 h-8 rounded-[32px] placeholder:text-sm focus:outline-none transition-all duration-200"
          type="text"
          placeholder="검색어를 입력해주세요."
          onFocus={handleFocus}
          value={value}
          onChange={handleChange}
        />
      </form>
      <ThemeToggle />
    </div>
  );
}

export default React.memo(HeaderSearchContainer);
