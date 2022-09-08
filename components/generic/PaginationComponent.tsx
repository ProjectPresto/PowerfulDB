/* eslint-disable react-hooks/exhaustive-deps */
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Pagination } from "../../models/generic";

interface Props {
  pagination: Pagination;
}

const PaginationComponent: NextComponentType<NextPageContext, {}, Props> = ({ pagination }: Props) => {
  const router = useRouter();

  const getCurrentPage = () => parseInt((router.query.page ?? "1").toString());
  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage());
  useEffect(() => {
    setCurrentPage(getCurrentPage());
  }, [router.query.page]);

  const getPagesList = () => {
    const { page_count: pageCount } = pagination;
    const currentPage = getCurrentPage();
    let list: number[] = [];
    if (pageCount <= 6) {
      list = Array.from({ length: pageCount }, (_, i) => i + 1);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i > 0 && i < pageCount + 1) list.push(i);
      }

      // Check if first page or last are in the list
      // If so, don't add -1 number after/before them
      // Number -1 is used as a placeholder for "..." string
      if (list[0] === 1) {
        list.push(-1, pageCount);
      } else if (list.at(-1) === pageCount) {
        list.unshift(1, -1);
      } else {
        list.unshift(1, -1);
        list.push(-1, pageCount);
      }
    }
    return list;
  };
  const [pagesList, setPagesList] = useState<number[]>(getPagesList());
  useEffect(() => {
    setPagesList(getPagesList());
  }, [router.query.page, router.query.size]);

  const handlePageChange = (page: number) => {
    router.query.page = page.toString();
    router.replace({
      query: router.query,
    });
  };

  return (
    <div className="my-8 mx-auto flex rounded-lg bg-primary-dark w-fit overflow-hidden">
      <button
        type="submit"
        className="py-3 px-4 disabled:text-gray-500"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"«"}
      </button>
      {pagesList.map((pageNum, index) => (
        <button
          key={index}
          type="submit"
          className={`flex justify-center items-center py-3 px-4 enabled:hover:opacity-60 ${pageNum === currentPage && "bg-secondary-accent"}`}
          disabled={pageNum === -1}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum !== -1 ? pageNum : "..."}
        </button>
      ))}
      <button
        type="submit"
        className="py-3 px-4 disabled:text-gray-500"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pagination.page_count}
      >
        {"»"}
      </button>
    </div>
  );
};

export default PaginationComponent;
