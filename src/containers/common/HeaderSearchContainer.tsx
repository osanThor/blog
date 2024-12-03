"use client";

import ThemeToggle from "@/components/common/ThemeToggle";
import useDebounce from "@/hooks/debounde";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "next/form";

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

  useEffect(() => {
    if (pathname.startsWith("/search"))
      router.replace(`/search?query=${debouncedValue}`);
  }, [debouncedValue]);

  useEffect(() => {
    if (!pathname.startsWith("/search")) setValue("");
  }, [pathname]);

  return (
    <div className="items-center gap-2 flex">
      <Form action={"/search"}>
        <input
          className="w-[170px] bg-neutral-100 dark:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-600 px-4 h-8 rounded-[32px] placeholder:text-sm placeholder:text-neutral-500 focus:outline-none"
          type="text"
          placeholder="검색어를 입력해주세요."
          onFocus={handleFocus}
          value={value}
          onChange={handleChange}
        />
      </Form>
      <div className="hidden md:flex">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default React.memo(HeaderSearchContainer);
