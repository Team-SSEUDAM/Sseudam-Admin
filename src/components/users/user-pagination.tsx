"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function UserPagination({
  currentPage,
  totalPages,
}: UserPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageURL(page));
  };

  return (
    <div className="flex justify-between items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // 현재 페이지 주변 2페이지씩만 표시
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              );
            })
            .map((page, index, array) => {
              // 건너뛴 페이지가 있으면 ... 표시
              const showEllipsis = index > 0 && page - array[index - 1] > 1;

              return (
                <div key={page} className="flex items-center">
                  {showEllipsis && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      href={createPageURL(page)}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              );
            })}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
