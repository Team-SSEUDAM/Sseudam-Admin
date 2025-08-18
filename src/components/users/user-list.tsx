"use client";

import { useSearchParams } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import UserListItem from "./user-list-item";
import UserPagination from "./user-pagination";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const PAGE_SIZE = 10;

export default function UserList() {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "0");
  const params = { page, size: PAGE_SIZE };

  const { data, isLoading, error } = useUsers(params);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">
            유저 목록을 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.totalCount / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          총 {data.totalCount}명의 유저
        </div>
      </div>

      <div className="space-y-3">
        {data.list.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            등록된 유저가 없습니다.
          </div>
        ) : (
          data.list.map((user) => (
            <UserListItem key={user.userId} user={user} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <UserPagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
