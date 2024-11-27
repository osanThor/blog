"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import useDebounce from "@/hooks/debounde";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function HeaderSearchContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const handleFocus = () => {
    if (!pathname.startsWith("/search")) router.push("/search");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) router.push(`/search/${value.trim()}`);
  };

  useEffect(() => {
    if (pathname.startsWith("/search"))
      router.push(`/search/${debouncedValue}`);
  }, [debouncedValue]);

  useEffect(() => {
    if (!pathname.startsWith("/search")) setValue("");
  }, [pathname]);

  return (
    <div className="items-center gap-2 flex">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[170px] bg-neutral-100 dark:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-600 px-4 h-8 rounded-[32px] placeholder:text-sm placeholder:text-neutral-500 focus:outline-none"
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

export default React.memo(HeaderSearchContainer);
