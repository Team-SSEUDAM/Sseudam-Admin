"use server";

import { z } from "zod";
import { cookies } from "next/headers";

const loginSchema = z.object({
  loginId: z.string().min(3, "ID는 최소 3자 이상이어야 합니다"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export type LoginState = {
  error?: string;
  success?: boolean;
  accessToken?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const loginId = formData.get("id") as string;
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ loginId, password });

  if (!result.success) {
    return {
      error: result.error.errors[0]?.message || "입력 정보를 확인해주세요",
    };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/v1/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ loginId, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { success, data } = await response.json();

    if (success || data) {
      console.log("로그인 성공");
      console.log(data.refreshToken);

      const cookieStore = await cookies();
      cookieStore.set("refreshToken", data.refreshToken, {
        // httpOnly: true, // TODO: 쿠키 보안 논의 필요
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 28 * 24 * 60 * 60,
        path: "/",
      });

      return {
        success: true,
        accessToken: data.accessToken,
      };
    } else {
      return {
        error: data.message || "로그인에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    return {
      error: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}
