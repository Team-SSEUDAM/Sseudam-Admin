import { useQuery } from "@tanstack/react-query";
import { getUsers, type UserListParams } from "@/lib/api/users";

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
}
