"use client";

import MobileNavbar from "@/components/common/MobileNavbar";
import CloseIcon from "@/components/common/icons/CloseIcon";
import MenuIcon from "@/components/common/icons/MenuIcon";
import HeaderNavbar from "@/components/header/HeaderNavbar";
import HeaderSearchContainer from "@/containers/common/HeaderSearchContainer";
import { useEffect, useRef, useState } from "react";

export default function HeaderContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  const handleClickTopBtn = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => {
      if (observerTargetRef.current) {
        observer.unobserve(observerTargetRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={observerTargetRef} className="h-0 w-full" />
      <header
        className={`${
          isScrolled
            ? "shadow-sm shadow-neutral-200 dark:shadow-neutral-700"
            : ""
        } transition-all duration-200 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white w-full flex items-center justify-center sticky top-0 left-0 right-0 px-4 lg:px-5 py-4 z-[999]`}
      >
        <div className="w-full max-w-[1082px] flex items-center justify-between">
          <HeaderNavbar />
          <div className="flex items-center justify-between gap-4">
            <HeaderSearchContainer />
            <button
              aria-label="menuToggleBtn"
              className="text-2xl flex sm:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        <MobileNavbar open={open} setOpen={setOpen} />
      </header>
      <button
        aria-label="topButton"
        onClick={handleClickTopBtn}
        className={`${
          isScrolled ? "bottom-5" : "-bottom-20"
        } fixed transition-all ease-linear right-4 w-10 h-10 md:w-16 md:h-16 font-bold z-[99] group`}
      >
        <span className="group-hover:animate-pulse absolute h-full w-full rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-white opacity-35"></span>
        up!
      </button>
    </>
  );
}
