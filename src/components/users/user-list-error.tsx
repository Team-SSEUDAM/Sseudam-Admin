"use client";
import type { FallbackProps } from "react-error-boundary";

export default function UserListError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-64">
      <div className="text-center">
        <p className="text-red-600 mb-2">
          유저 목록을 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="text-sm text-gray-600">{error.message}</p>
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
