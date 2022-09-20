/* eslint-disable react-hooks/exhaustive-deps */
import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Pagination } from "@models/generic";

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
        // Don't put first or last page in the list. They'll be added later
        if (i > 1 && i < pageCount) list.push(i);
      }

      /**
       * Check if current page is in the range of first page or last page
       * Current page range is 3 (if current page is 5 than the list should like this [3, 4, 5, 6, 7])
       * If we extract 3 from current page and its equal or less than 1 we are close too 1 (no need for "...")
       * Same applies for last page
       *
       * Add -1 as a indicator that we're not in the range of a first or last page
       * -1 is used as a placeholder for "..." string
       */
      if (currentPage - 3 <= 1) {
        list.push(-1);
      } else if (currentPage + 3 >= pageCount) {
        list.unshift(-1);
      } else {
        list.push(-1);
        list.unshift(-1);
      }

      // Add first and last page
      list.unshift(1);
      list.push(pageCount);
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

  return pagination.page_count !== 1 ? (
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
  ) : null;
};

export default PaginationComponent;
