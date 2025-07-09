import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminHeader from "@/components/layouts/admin-header";
import TrashCanList from "@/components/suggestions/trash-can-list";
import TrashCanListError from "@/components/suggestions/trash-can-list-error";
import { FullPageLoadingSpinner } from "@/components/ui/loading-spinner";

export default function TrashCansPage() {
  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">쓰레기통 제보 리스트</h1>
        <ErrorBoundary FallbackComponent={TrashCanListError}>
          <Suspense
            fallback={
              <FullPageLoadingSpinner text="제보 목록을 불러오는 중..." />
            }
          >
            <TrashCanList />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
