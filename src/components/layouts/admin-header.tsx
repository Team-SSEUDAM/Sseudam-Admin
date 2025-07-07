"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  const router = useRouter();

  // TODO: 실제 사용자 정보 연동 필요
  const user = { loginId: "admin" };

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 연동 필요
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b shadow-sm mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-bold text-lg text-blue-600">
            Sseudam Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition-colors"
            >
              대시보드
            </Link>
            <Link
              href="/suggestions/trash-cans"
              className="hover:text-blue-600 transition-colors"
            >
              쓰레기통 제보
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm">{user.loginId}</span>
          <Button size="icon" variant="ghost" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
