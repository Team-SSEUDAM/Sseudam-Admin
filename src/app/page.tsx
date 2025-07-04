import { LoginForm } from "@/components/login-form";
import { Smartphone } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sseudam Admin
          </h1>
        </div>

        <LoginForm />

        <div className="text-center mt-8 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sseudam. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
