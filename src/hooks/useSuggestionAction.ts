import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSuggestionStatus } from "@/lib/api/suggestions";
import type {
  SuggestionStatus,
  SuggestionPage,
  TrashCanSuggestion,
} from "@/types/suggestion";
import { toast } from "@/components/ui/sonner";

/**
 * @typedef {object} UseSuggestionActionParams
 * @property {number} id - 제보 ID
 * @property {SuggestionStatus} status - 변경할 상태
 */
interface UseSuggestionActionParams {
  id: number;
  status: SuggestionStatus;
}

/**
 * 관리자 제보 상태 변경(승인/반려/대기) 액션 훅
 * - 낙관적 업데이트 및 에러 롤백 지원
 */
export function useSuggestionAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UseSuggestionActionParams) =>
      updateSuggestionStatus({ id, status }),
    onMutate: async ({ id, status }) => {
      const queries = queryClient.getQueriesData<SuggestionPage>({
        queryKey: ["suggestions"],
      });
      await Promise.all(
        queries.map(([queryKey]) => queryClient.cancelQueries({ queryKey }))
      );

      const previous = queries.map(([queryKey, data]) => ({ queryKey, data }));

      queries.forEach(([queryKey, data]) => {
        if (!data) return;
        queryClient.setQueryData<SuggestionPage>(queryKey, {
          ...data,
          list: data.list.map((item: TrashCanSuggestion) =>
            item.id === id ? { ...item, status } : item
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
            data: SuggestionPage | undefined;
          }) => {
            queryClient.setQueryData(queryKey, data);
          }
        );
      }
      toast.error("요청에 실패하였습니다.");
    },
    onSuccess: (_data, variables) => {
      if (variables.status === "APPROVE") {
        toast.success("제보가 승인되었습니다.");
      } else if (variables.status === "REJECT") {
        toast.success("제보가 반려되었습니다.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });
}
