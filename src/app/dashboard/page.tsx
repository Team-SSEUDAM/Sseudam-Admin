"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LogOut,
  User,
  Users,
  Smartphone,
  BarChart3,
  Settings,
} from "lucide-react";
import { logoutAction, type LogoutState } from "@/app/actions/logout";

const initialState: LogoutState = {};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [logoutState, formAction] = useActionState(logoutAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (logoutState.success) {
      useAuthStore.getState().logout();
      router.push("/");
    }
  }, [logoutState.success, router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              관리자 대시보드
            </h1>
            <p className="text-gray-600 mt-1">시스템 관리 및 모니터링</p>
          </div>
          <form action={formAction}>
            <Button
              type="submit"
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </Button>
          </form>
        </div>

        {/* 에러 메시지 */}
        {logoutState.error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {logoutState.error}
          </div>
        )}

        {/* 사용자 정보 카드 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              사용자 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">로그인 ID</p>
                <p className="font-medium">{user?.loginId || "관리자"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 대시보드 내용 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">시스템 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">정상</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">활성 사용자</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-gray-500">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">시스템 로드</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">67%</p>
              <p className="text-sm text-gray-500">CPU 사용률</p>
            </CardContent>
          </Card>
        </div>

        {/* 관리 메뉴 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">관리 메뉴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              사용자 관리
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Smartphone className="w-6 h-6" />
              디바이스 관리
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              통계 보기
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Settings className="w-6 h-6" />
              설정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
