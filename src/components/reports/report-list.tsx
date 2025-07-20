"use client";

import { useReports } from "@/hooks/useReports";
import { useReportAction } from "@/hooks/useReportAction";
import { PAGE_SIZE } from "@/constants/pagination";
import { REPORT_TYPE } from "@/types/report";
import { COMMON_STATUS } from "@/constants/status";
import { Button } from "@/components/ui/button";
import ReportListItem from "./report-list-item";
import ReportPagination from "./report-pagination";

const TYPE_FILTERS = [
  { value: "ALL", label: "전체" },
  { value: REPORT_TYPE.POINT, label: "좌표" },
  { value: REPORT_TYPE.PHOTO, label: "사진" },
  { value: REPORT_TYPE.NAME, label: "이름" },
  { value: REPORT_TYPE.KIND, label: "종류" },
] as const;

export default function ReportList() {
  const {
    currentPage,
    allItems,
    hasNextPage,
    totalCount,
    handlePreviousPage,
    handleNextPage,
    searchType,
    updateType,
  } = useReports();

  const { mutate: mutateReportStatus } = useReportAction();

  const handleApprove = (reportId: number, spotId: number) => {
    mutateReportStatus({ reportId, spotId, status: COMMON_STATUS.APPROVE });
  };

  const handleReject = (reportId: number, spotId: number) => {
    mutateReportStatus({ reportId, spotId, status: COMMON_STATUS.REJECT });
  };

  const handleFilterChange = (type: string) => {
    updateType(type);
  };

  return (
    <div>
      {/* 타입별 필터 버튼 */}
      <div className="flex gap-2 mb-4">
        {TYPE_FILTERS.map((filter) => (
          <Button
            key={filter.value}
            variant={searchType === filter.value ? "default" : "outline"}
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
          <span className="ml-2 text-gray-400">(총 {totalCount}개 신고)</span>
        </div>
      </div>

      <div className="space-y-4">
        {allItems.map((item) => (
          <ReportListItem
            key={item.id}
            item={item}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
        {allItems.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            해당 타입의 신고가 없습니다.
          </div>
        )}
      </div>

      <ReportPagination
        currentPage={currentPage}
        totalPages={Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
        hasNextPage={hasNextPage}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        searchType={searchType}
      />
    </div>
  );
}
