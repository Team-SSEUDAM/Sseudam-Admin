"use client";

import { useSuggestions } from "@/hooks/useSuggestions";
import { PAGE_SIZE } from "@/constants/pagination";
import TrashCanListItem from "./trash-can-list-item";
import TrashCanPagination from "./trash-can-pagination";
import { useSuggestionAction } from "@/hooks/useSuggestionAction";

export default function TrashCanList() {
  const {
    currentPage,
    allItems,
    hasNextPage,
    totalCount,
    handlePreviousPage,
    handleNextPage,
  } = useSuggestions();

  const { mutate: mutateSuggestionStatus } = useSuggestionAction();

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const handleApprove = (id: number) => {
    mutateSuggestionStatus({ id, status: "APPROVE" });
  };

  const handleReject = (id: number) => {
    mutateSuggestionStatus({ id, status: "REJECT" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          페이지 {currentPage} / {totalPages}
          <span className="ml-2 text-gray-400">(총 {totalCount}개 제보)</span>
        </div>
      </div>

      <div className="space-y-4">
        {allItems.map((item) => (
          <TrashCanListItem
            key={item.id}
            item={item}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
        {allItems.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            제보가 없습니다.
          </div>
        )}
      </div>

      <TrashCanPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
}
