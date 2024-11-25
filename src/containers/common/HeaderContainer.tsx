"use client";

import MobileNavbar from "@/components/common/MobileNavbar";
import CloseIcon from "@/components/common/icons/CloseIcon";
import MenuIcon from "@/components/common/icons/MenuIcon";
import HeaderNavbar from "@/components/header/HeaderNavbar";
import HeaderSearchContainer from "@/containers/common/HeaderSearchContainer";
import { useEffect, useState } from "react";

export default function HeaderContainer() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

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
        <div className="flex items-center justify-between gap-4">
          <HeaderSearchContainer />
          <button
            className="text-2xl flex sm:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <MobileNavbar open={open} setOpen={setOpen} />
    </header>
  );
}
