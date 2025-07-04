"use server";

import { cookies } from "next/headers";

export type LogoutState = {
  success?: boolean;
  error?: string;
};

export async function logoutAction(): Promise<LogoutState> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      await fetch(`${apiUrl}/v1/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.warn("로그아웃 API 호출 실패:", error);
    }

    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");

    return {
      success: true,
    };
  } catch (error) {
    console.error("로그아웃 중 오류:", error);
    return {
      error: "로그아웃 중 오류가 발생했습니다.",
    };
  }
}
