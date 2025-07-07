"use client";
import type { FallbackProps } from "react-error-boundary";

export default function TrashCanListError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">
        {error.message || "데이터를 불러오지 못했습니다."}
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={resetErrorBoundary}
      >
        다시 시도
      </button>
    </div>
  );
}
