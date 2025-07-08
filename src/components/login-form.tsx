"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { loginAction, type LoginState } from "@/app/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useAuthStore } from "@/stores";

const initialState: LoginState = {};

export function LoginForm() {
  const [loginState, formAction] = useActionState(loginAction, initialState);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (loginState.success && loginState.accessToken) {
      login(loginState.accessToken, null);
      router.push("/suggestions/trash-cans");
    }
  }, [loginState.success, loginState.accessToken, login, router]);

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-center">관리자 로그인</CardTitle>
        <CardDescription className="text-center">
          계정 정보를 입력하여 로그인하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {/* ID 필드 */}
          <div className="space-y-2">
            <Label htmlFor="id" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              아이디
            </Label>
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력하세요"
              className="h-12"
              required
            />
          </div>

          {/* 비밀번호 필드 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              비밀번호
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="h-12"
              required
            />
          </div>

          {/* 에러 메시지 */}
          {loginState.error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {loginState.error}
            </div>
          )}

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            로그인
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Button variant="link" className="text-xs p-0 h-auto">
            관리자에게 문의
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
