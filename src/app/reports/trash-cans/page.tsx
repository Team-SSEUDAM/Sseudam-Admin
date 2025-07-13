import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminHeader from "@/components/layouts/admin-header";
import ReportList from "@/components/reports/report-list";
import { FullPageLoadingSpinner } from "@/components/ui/loading-spinner";
import ReportListError from "@/components/reports/report-list-error";

export default function ReportsPage() {
  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">쓰레기통 신고 리스트</h1>
        <ErrorBoundary FallbackComponent={ReportListError}>
          <Suspense
            fallback={
              <FullPageLoadingSpinner text="신고 목록을 불러오는 중..." />
            }
          >
            <ReportList />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
