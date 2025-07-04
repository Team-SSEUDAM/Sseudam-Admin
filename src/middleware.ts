import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: 인증 URL (temp)
const protectedRoutes = ["/dashboard"];
// NOTE: 공개 URL
const publicRoutes = ["/"];

// NOTE: 토큰 갱신 함수
async function refreshToken(
  refreshToken: string
): Promise<{ success: boolean; newRefreshToken?: string }> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/v1/admin/reissue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return { success: false };
    }

    const { data } = await response.json();

    if (data.accessToken && data.refreshToken) {
      return {
        success: true,
        newRefreshToken: data.refreshToken,
      };
    }

    return { success: false };
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    return { success: false };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`[Middleware] 접근 경로: ${pathname}`);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  const refreshTokenCookie = request.cookies.get("refreshToken");
  let isAuthenticated = !!refreshTokenCookie?.value;

  // NOTE: 보호된 라우트 접근 시 토큰 유효성 검증 및 갱신 시도
  if (isProtectedRoute && refreshTokenCookie?.value) {
    const refreshResult = await refreshToken(refreshTokenCookie.value);

    if (refreshResult.success) {
      isAuthenticated = true;

      // NOTE: 새로운 refreshToken이 있다면 쿠키 업데이트
      if (refreshResult.newRefreshToken) {
        const response = NextResponse.next();
        response.cookies.set("refreshToken", refreshResult.newRefreshToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 28 * 24 * 60 * 60,
          path: "/",
        });
        return response;
      }
    } else {
      isAuthenticated = false;
    }
  }

  // NOTE: 인증되지 않은 사용자가 보호된 라우트 접근 시
  if (isProtectedRoute && !isAuthenticated) {
    console.log(
      `[Middleware] 인증되지 않은 사용자가 보호된 라우트 접근: ${pathname} → /로 리다이렉트`
    );
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // NOTE: 이미 인증된 사용자가 로그인 페이지 접근 시
  if (isPublicRoute && isAuthenticated && pathname === "/") {
    console.log(
      `[Middleware] 인증된 사용자가 로그인 페이지 접근: ${pathname} → /dashboard로 리다이렉트`
    );
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // NOTE: 그 외의 경우는 정상적으로 진행
  console.log(`[Middleware] 정상 접근 허용: ${pathname}`);
  return NextResponse.next();
}

/* NOTE: 미들웨어가 실행될 경로 설정
  모든 페이지에서 실행되지만, 다음 경로들은 제외:
  - api (API routes)
  - _next/static (static files)
  - _next/image (image optimization files)
  - favicon.ico (favicon file)
  - public folder
*/
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
