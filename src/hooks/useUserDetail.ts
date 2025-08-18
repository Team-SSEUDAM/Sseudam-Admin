import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserDetail } from "@/lib/api/users";

export function useUserDetail(userId: number) {
  return useSuspenseQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => getUserDetail(userId),
  });
}
