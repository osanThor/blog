"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import useDebounce from "@/hooks/debounde";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function HeaderSearchContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value);
  const prevDebouncedRef = useRef(debouncedValue);

  const handleFocus = () => {
    if (!pathname.startsWith("/search")) router.push("/search");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) router.replace(`/search?query=${value.trim()}`);
  };

  // pathname 변경이 아닌 검색어 변경일 때만 URL 갱신
  useEffect(() => {
    if (prevDebouncedRef.current === debouncedValue) return;
    prevDebouncedRef.current = debouncedValue;
    if (pathname.startsWith("/search"))
      router.replace(`/search?query=${debouncedValue}`);
  }, [debouncedValue, pathname, router]);

  useEffect(() => {
    if (!pathname.startsWith("/search")) setValue("");
  }, [pathname]);

  return (
    <div className="items-center gap-2 flex">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[170px] bg-neutral-100 dark:bg-neutral-800 focus:bg-neutral-200 dark:focus:bg-neutral-600 px-4 h-8 rounded-[32px] placeholder:text-sm placeholder:text-neutral-500 focus:outline-none"
          type="text"
          placeholder="검색어를 입력해주세요."
          onFocus={handleFocus}
          value={value}
          onChange={handleChange}
        />
      </form>
      <div className="hidden md:flex">
        <ThemeToggle />
      </div>
    </div>
  );
}
