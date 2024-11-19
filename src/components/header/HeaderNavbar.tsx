"use client";
import { headerLinks } from "@/constants/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function HeaderNavbar() {
  const pathname = usePathname();
  return (
    <nav className="gnb">
      <ul className="flex items-center gap-4">
        {headerLinks.map((link) => {
          const currentPath = pathname.split("/").pop();
          const targetPath = link.href.split("/").pop();
          const isSamePath = currentPath === targetPath;
          return (
            <li key={`header-link-${link.name}`}>
              <Link
                href={link.href}
                className={`${
                  isSamePath ? "font-bold" : "font-medium"
                } hover:bg-neutral-100 dark:hover:bg-neutral-700 inline-block px-2 py-1 rounded-sm transition-all duration-200 `}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default React.memo(HeaderNavbar);
