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

  const { data } = useSuspenseQuery<SuggestionPage, Error>({
    queryKey: ["suggestions", currentPage],
    queryFn: () => fetchSuggestions({ page: currentPage - 1 }), // NOTE: API는 0부터 시작하므로 -1
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
    handlePreviousPage,
    handleNextPage,
  };
}
