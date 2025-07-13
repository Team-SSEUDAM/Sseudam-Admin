"use client";
import type { FallbackProps } from "react-error-boundary";

export default function ReportListError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="text-center py-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {error.message || "데이터를 불러오지 못했습니다."}
      </h2>
      <p className="text-gray-600 mb-4">잠시 후 다시 시도해주세요.</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
