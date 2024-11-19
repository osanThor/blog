"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className={`w-[48px] h-[24px] relative flex rounded-[32px] p-[2px] ease-linear transition-all duration-200 border border-neutral-300 dark:border-neutral-500 `}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      ></button>
    );
  }

  const isDark = resolvedTheme === "dark";
  const beforeDefault =
    "before:w-[16px] before:h-[16px] before:block before:rounded-full before:transition-all before:duration-200 before:absolute before:top-[1px] before:left-0";
  const afterDefault =
    "after:block after:rounded-full after:transition-all after:duration-300 after:absolute after:top-0 after:left-0";
  return (
    <button
      className={`w-[48px] h-[24px] relative flex rounded-[32px] p-[2px] ease-linear transition-all duration-200 border border-neutral-300 dark:border-neutral-500 ${
        isDark ? "bg-neutral-800" : "bg-white"
      }`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span
        className={`inline-block w-full h-full relative overflow-hidden ${beforeDefault} ${afterDefault} ${
          isDark
            ? "before:bg-white before:left-[24px] after:w-[18px] after:h-[18px] after:bg-neutral-800 after:left-4 after:-top-1 after:opacity-1"
            : "before:bg-neutral-800 before:left-0 after:w-[1px] after:h-[1px] after:bg-white after:left-0 after:-top-0 after:opacity-0"
        }`}
      />
      {/* <span
        className={`w-[18px] h-[18px] absolute inline-block rounded-full ease-linear transition-all duration-200 top-1/2 -translate-y-1/2 overflow-hidden after:transition-all after:duration-200 after:block after:w-4 after:h-4 after:rounded-full after:border after:border-black after:absolute after:top-0 after:left-0 after:bg-neutral-800 ${
          isDark
            ? "bg-white left-[26px] after:-translate-y-1/3 after:-translate-x-1/3  after:opacity-1"
            : "bg-neutral-950 left-[2px] after:-translate-y-full after:-translate-x-full after:opacity-0"
        }`}
      /> */}
    </button>
  );
}
