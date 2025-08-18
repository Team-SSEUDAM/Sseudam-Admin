import type { UserDetail, UserListResponse } from "@/types/user";
import { apiRequest } from "../auth";

export interface UserListParams {
  page: number;
  size: number;
}

export async function getUsers(
  params: UserListParams
): Promise<UserListResponse> {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
  });

  const response = await apiRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/admin/users?${searchParams}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.data;
}

export async function getUserDetail(userId: number): Promise<UserDetail> {
  const response = await apiRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/admin/users/${userId}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.data;
}
