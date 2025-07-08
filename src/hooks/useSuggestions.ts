import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { fetchSuggestions } from "@/lib/api/suggestions";
import type { SuggestionPage } from "@/types/suggestion";

export function useSuggestions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const searchStatus = searchParams.get("searchStatus") || "ALL";

  const { data } = useSuspenseQuery<SuggestionPage, Error>({
    queryKey: ["suggestions", currentPage, searchStatus],
    queryFn: () => fetchSuggestions({ page: currentPage - 1, searchStatus }),
    retry: false,
  });

  const updatePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const updateStatus = useCallback(
    (newStatus: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("searchStatus", newStatus);
      params.set("page", "1"); // 필터 변경 시 1페이지로 이동
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  }, [currentPage, updatePage]);

  const handleNextPage = useCallback(() => {
    if (data?.nextPage !== undefined) {
      updatePage(currentPage + 1);
    }
  }, [currentPage, data?.nextPage, updatePage]);

  const allItems = data?.list ?? [];

  return {
    data,
    currentPage,
    allItems,
    hasNextPage: data?.nextPage !== undefined,
    totalCount: data?.totalCount ?? 0,
    handlePreviousPage,
    handleNextPage,
    searchStatus,
    updateStatus,
  };
}
