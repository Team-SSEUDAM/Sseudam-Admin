"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initializeAuth } from "@/lib/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const isAuthenticated = await initializeAuth();

        if (!isAuthenticated) {
          console.log("클라이언트: 인증되지 않음");
        } else {
          console.log("클라이언트: 인증됨");
        }
      } catch (error) {
        console.error("인증 초기화 중 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
