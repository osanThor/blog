"use client";

import HeaderNavbar from "@/components/header/HeaderNavbar";
import HeaderSearchContainer from "@/containers/common/HeaderSearchContainer";
import { useWidowStore } from "@/utils/lib/zustand/window";
import { useEffect } from "react";

export default function HeaderContainer() {
  const { scrollY, setScrollY } = useWidowStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scrollY > 0
          ? "shadow-md shadow-neutral-100 dark:shadow-neutral-700"
          : ""
      } transition-all duration-200 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white w-full flex items-center justify-center sticky top-0 left-0 right-0 px-4 lg:px-5 py-4 z-[999]`}
    >
      <div className="w-full max-w-[1082px] flex items-center justify-between">
        <HeaderNavbar />
        <HeaderSearchContainer />
      </div>
    </header>
  );
}
