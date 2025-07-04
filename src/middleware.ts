import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: 인증 URL (temp)
const protectedRoutes = ["/dashboard"];
// NOTE: 공개 URL
const publicRoutes = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`[Middleware] 접근 경로: ${pathname}`);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  const refreshToken = request.cookies.get("refreshToken");
  const isAuthenticated = !!refreshToken?.value; // TODO: 유효한 토큰인지 확인 필요

  // NOTE: 인증되지 않은 사용자가 접근하려는 경우
  if (isProtectedRoute) {
    if (!isAuthenticated) {
      console.log(
        `[Middleware] 인증되지 않은 사용자가 보호된 라우트 접근: ${pathname} → /로 리다이렉트`
      );
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // NOTE: 이미 인증된 사용자가 로그인 페이지에 접근하는 경우
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
