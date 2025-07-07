import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TrashCanPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export default function TrashCanPagination({
  currentPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}: TrashCanPaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        이전
      </Button>

      <span className="text-sm text-gray-600">{currentPage} 페이지</span>

      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="flex items-center gap-1"
      >
        다음
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
