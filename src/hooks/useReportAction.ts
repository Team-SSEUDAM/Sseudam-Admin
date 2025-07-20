import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReportStatus } from "@/lib/api/reports";
import type { ReportStatus, ReportPage } from "@/types/report";
import { toast } from "@/components/ui/sonner";

/**
 * 신고 상태 변경 액션 훅
 * - 낙관적 업데이트 및 에러 롤백 지원
 */
export function useReportAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      spotId,
      status,
    }: {
      reportId: number;
      spotId: number;
      status: string;
    }) => updateReportStatus({ reportId, spotId, status }),
    onMutate: async ({ spotId, status }) => {
      const queries = queryClient.getQueriesData<ReportPage>({
        queryKey: ["reports"],
      });
      await Promise.all(
        queries.map(([queryKey]) => queryClient.cancelQueries({ queryKey }))
      );

      const previous = queries.map(([queryKey, data]) => ({ queryKey, data }));

      queries.forEach(([queryKey, data]) => {
        if (!data) return;
        queryClient.setQueryData<ReportPage>(queryKey, {
          ...data,
          list: data.list.map((item) =>
            item.spotId === spotId
              ? { ...item, status: status as ReportStatus }
              : item
          ),
        });
      });
      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        context.previous.forEach(
          ({
            queryKey,
            data,
          }: {
            queryKey: readonly unknown[];
            data: ReportPage | undefined;
          }) => {
            queryClient.setQueryData(queryKey, data);
          }
        );
      }
      toast.error("요청에 실패하였습니다.");
    },
    onSuccess: (_data, variables) => {
      if (variables.status === "APPROVE") {
        toast.success("신고가 승인되었습니다.");
      } else if (variables.status === "REJECT") {
        toast.success("신고가 반려되었습니다.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}
