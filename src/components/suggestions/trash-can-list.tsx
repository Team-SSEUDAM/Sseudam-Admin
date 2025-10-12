"use client";

import { useSuggestions } from "@/hooks/useSuggestions";
import { PAGE_SIZE } from "@/constants/pagination";
import TrashCanListItem from "./trash-can-list-item";
import TrashCanPagination from "./trash-can-pagination";
import { useSuggestionAction } from "@/hooks/useSuggestionAction";
import { COMMON_STATUS } from "@/constants/status";
import { STATUS_LABELS } from "@/constants/status";
import { Button } from "@/components/ui/button";

const STATUS_FILTERS = [
  { value: "ALL", label: "전체" },
  ...Object.values(COMMON_STATUS).map((value) => ({
    value,
    label: STATUS_LABELS[value],
  })),
] as const;

export default function TrashCanList() {
  const {
    currentPage,
    allItems,
    hasNextPage,
    totalCount,
    handlePreviousPage,
    handleNextPage,
    searchStatus,
    updateStatus,
  } = useSuggestions();

  const { mutate: mutateSuggestionStatus } = useSuggestionAction();

  const handleApprove = (id: number) => {
    mutateSuggestionStatus({ id, status: COMMON_STATUS.APPROVE });
  };

  const handleReject = (id: number, reason: string) => {
    mutateSuggestionStatus({ id, status: COMMON_STATUS.REJECT, reason });
  };

  const handleFilterChange = (status: string) => {
    updateStatus(status);
  };

  return (
    <div>
      {/* 상태별 필터 버튼 */}
      <div className="flex gap-2 mb-4">
        {STATUS_FILTERS.map((filter) => (
          <Button
            key={filter.value}
            variant={searchStatus === filter.value ? "default" : "outline"}
            onClick={() => handleFilterChange(filter.value)}
            size="sm"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          페이지 {currentPage} /{" "}
          {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
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
            해당 상태의 제보가 없습니다.
          </div>
        )}
      </div>

      <TrashCanPagination
        currentPage={currentPage}
        totalPages={Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
        hasNextPage={hasNextPage}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        searchStatus={searchStatus}
      />
    </div>
  );
}
