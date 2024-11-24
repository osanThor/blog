"use client";
import { headerLinks } from "@/constants/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileNavbar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const getLinkClass = (isActive: boolean) =>
    `${
      isActive ? "font-bold" : "font-medium"
    } hover:bg-neutral-100 dark:hover:bg-neutral-700 
     inline-block px-2 py-1 rounded-sm transition-all duration-200 `;

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div
      className={`${
        open ? "w-full" : "w-[1px]"
      } overflow-hidden bg-inherit fixed top-[64px] right-0 bottom-0 flex sm:hidden ease-linear transition-all duration-100`}
    >
      <nav className="gnb flex flex-col gap-7 p-4">
        <ul className="flex flex-col gap-4">
          {headerLinks.map(({ name, href }) => {
            const isHomePage = href === "/";
            const isActive = isHomePage
              ? pathname === "/"
              : pathname.split("/").includes(href.split("/").pop() || "");

            return (
              <li key={`mo-header-link-${name}`}>
                <Link
                  href={href}
                  className={getLinkClass(isActive)}
                  onClick={() => setOpen(false)}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="w-full flex items-center justify-center">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
