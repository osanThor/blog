"use client";

import { headerLinks } from "@/constants/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function HeaderNavbar() {
  const pathname = usePathname();

  const getLinkClass = (isActive: boolean) =>
    `${
      isActive ? "font-bold" : "font-medium"
    } hover:bg-neutral-100 dark:hover:bg-neutral-700 
     inline-block px-2 py-1 rounded-sm transition-all duration-200`;

  return (
    <nav className="gnb">
      <ul className="flex items-center gap-4">
        {headerLinks.map(({ name, href, onPC }) => {
          const isHomePage = href === "/";
          const isActive = isHomePage
            ? pathname === "/"
            : pathname.split("/").includes(href.split("/").pop() || "");

          return (
            <li
              key={`header-link-${name}`}
              className={`${onPC ? "hidden sm:block" : "block"}`}
            >
              <Link href={href} className={getLinkClass(isActive)}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default React.memo(HeaderNavbar);
