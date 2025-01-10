"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  total: number;
  pageSize?: number;
  limit?: number;
};

export default function Pagination({ total, pageSize = 10, limit = 5 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const numPages = Math.ceil(total / pageSize);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const sliceArrayByLimit = (numPages: number, limit: number): number[][] => {
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);
    const result = [];
    for (let i = 0; i < pages.length; i += limit) {
      result.push(pages.slice(i, i + limit));
    }
    return result;
  };

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(numPages, limit);
    const pageIndex = Math.floor((currentPage - 1) / limit);
    setCurrentPageArray(slicedPageArray[pageIndex] || []);
  }, [numPages, currentPage]);

  const renderButton = (
    pageNumber: number,
    content: React.ReactNode,
    disabled: boolean
  ) => (
    <button
      aria-label={`${content}-btn`}
      className={`flex items-center justify-center hover:underline w-8 h-8 ${
        disabled ? "text-gray-400" : ""
      }`}
      onClick={() => handleChangePage(pageNumber)}
      disabled={disabled}
    >
      {content}
    </button>
  );

  return (
    <div className="w-full flex justify-center items-center">
      <div className="pagination flex items-center gap-4">
        {renderButton(currentPage - 1, "prev", currentPage === 1)}
        <div className="flex items-center">
          {currentPageArray.map((i) => (
            <button
              aria-label={`pageination-${i}`}
              type="button"
              key={i}
              className={`flex items-center justify-center min-w-[32px] hover:underline h-8 ${
                currentPage === i
                  ? "text-black dark:text-white font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => handleChangePage(i)}
            >
              {i}
            </button>
          ))}
        </div>
        {renderButton(
          currentPage + 1,
          "next",
          currentPage === numPages || numPages === 0
        )}
      </div>
    </div>
  );
}
