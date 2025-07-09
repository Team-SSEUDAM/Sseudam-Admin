"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/logout";
import { toast } from "@/components/ui/sonner";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result.success) {
      toast.success("로그아웃되었습니다.");
      router.push("/");
    } else {
      toast.error(result.error || "로그아웃에 실패했습니다.");
    }
  };

  return (
    <header className="w-full bg-white border-b shadow-sm mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/suggestions/trash-cans"
            className="font-bold text-lg text-blue-600"
          >
            Sseudam Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/suggestions/trash-cans"
              className="hover:text-blue-600 transition-colors"
            >
              제보
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
