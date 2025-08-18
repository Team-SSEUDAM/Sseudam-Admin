import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import UserList from "@/components/users/user-list";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import UserListError from "@/components/users/user-list-error";
import AdminHeader from "@/components/layouts/admin-header";

function UserListFallback() {
  return (
    <div className="flex justify-center items-center h-64">
      <LoadingSpinner />
    </div>
  );
}

export default function UsersPage() {
  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">유저 관리</h1>

        <ErrorBoundary FallbackComponent={UserListError}>
          <Suspense fallback={<UserListFallback />}>
            <UserList />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
