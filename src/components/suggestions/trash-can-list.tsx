"use client";

import { useSuggestions } from "@/hooks/useSuggestions";
import { PAGE_SIZE } from "@/constants/pagination";
import TrashCanListItem from "./trash-can-list-item";
import TrashCanPagination from "./trash-can-pagination";

export default function TrashCanList() {
  const {
    currentPage,
    allItems,
    hasNextPage,
    totalCount,
    handlePreviousPage,
    handleNextPage,
  } = useSuggestions();

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const handleApprove = (id: number) => {
    // TODO: 승인 API 호출
    console.log("승인:", id);
  };

  const handleReject = (id: number) => {
    // TODO: 반려 API 호출
    console.log("반려:", id);
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
