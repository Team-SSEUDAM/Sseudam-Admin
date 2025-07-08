import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface TrashCanPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  searchStatus?: string;
}

const PAGE_VIEW_COUNT = 7;

export default function TrashCanPagination({
  currentPage,
  totalPages,
  hasNextPage,
  onPreviousPage,
  onNextPage,
  searchStatus = "ALL",
}: TrashCanPaginationProps) {
  // NOTE: 페이지네이션 로직: 1, 2, ... n-1, n (7개 이하면 모두, 많으면 ...)
  const getPageNumbers = () => {
    if (totalPages <= PAGE_VIEW_COUNT) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  const makeHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchStatus && searchStatus !== "ALL") {
      params.set("searchStatus", searchStatus);
    }
    return `?${params.toString()}`;
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {/* 이전 페이지 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={onPreviousPage}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          />
        </PaginationItem>

        {/* 페이지 번호 */}
        {pageNumbers.map((num, idx) =>
          num === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={num}>
              <PaginationLink
                isActive={currentPage === num}
                href={makeHref(num as number)}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* 다음 페이지 */}
        <PaginationItem>
          <PaginationNext
            onClick={onNextPage}
            aria-disabled={!hasNextPage}
            tabIndex={!hasNextPage ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
