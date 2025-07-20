import { Suspense } from "react";
import { useTrashSpot } from "@/hooks/useTrashSpot";
import type { TrashCanReport } from "@/types/report";
import type { TrashType } from "@/types/suggestion";
import {
  formatTrashType,
  getGoogleMapSearchUrl,
  getTrashTypeColorClass,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface TrashSpotComparisonProps {
  report: TrashCanReport;
}

function TrashSpotComparisonContent({ report }: TrashSpotComparisonProps) {
  const { data: currentSpot } = useTrashSpot(report.spotId);
  const [currentLng, currentLat] = currentSpot.point.coordinates;
  const [reportLng, reportLat] = report.point.coordinates;

  const hasNameChange = currentSpot.name !== report.spotName;
  const hasAddressChange =
    currentSpot.address.city !== report.address.city ||
    currentSpot.address.site !== report.address.site;
  const hasLocationChange =
    currentLat !== reportLat || currentLng !== reportLng;
  const hasTrashTypeChange = currentSpot.trashType !== report.trashType;
  const hasImageChange = currentSpot.imageUrl !== report.imageUrl;

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm mb-3">변경사항 비교</h4>

      <Card className="p-4 space-y-4">
        {/* 이름 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm font-medium">이름:</span>
          <div className="flex items-center gap-4">
            <span className="text-sm">{currentSpot.name}</span>
            {hasNameChange && (
              <>
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                  {report.spotName}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 위치 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm font-medium">위치:</span>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {currentSpot.address.city} - {currentSpot.address.site}
            </span>
            {hasAddressChange && (
              <>
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                  {report.address.city} - {report.address.site}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 좌표 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm font-medium">좌표:</span>
          <div className="flex items-center gap-4">
            <a
              href={getGoogleMapSearchUrl(currentLat, currentLng)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              {currentLat}, {currentLng}
            </a>
            {hasLocationChange && (
              <>
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <a
                  href={getGoogleMapSearchUrl(reportLat, reportLng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded hover:underline"
                >
                  {reportLat}, {reportLng}
                </a>
              </>
            )}
          </div>
        </div>

        {/* 쓰레기 종류 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm font-medium">
            쓰레기 종류:
          </span>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className={getTrashTypeColorClass(currentSpot.trashType)}
            >
              {formatTrashType(currentSpot.trashType)}
            </Badge>
            {hasTrashTypeChange && (
              <>
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <Badge
                  variant="outline"
                  className={`${getTrashTypeColorClass(
                    report.trashType as TrashType
                  )} bg-blue-50 border-blue-200`}
                >
                  {formatTrashType(report.trashType as TrashType)}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* 이미지 */}
        {(currentSpot.imageUrl || report.imageUrl) && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">이미지:</span>
            <div className="flex items-center gap-4">
              {currentSpot.imageUrl && (
                <Image
                  src={currentSpot.imageUrl}
                  alt="기존 이미지"
                  width={280}
                  height={280}
                  className="rounded-md object-cover"
                />
              )}
              {hasImageChange && (
                <>
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  {report.imageUrl && (
                    <Image
                      src={report.imageUrl}
                      alt="신고 이미지"
                      width={280}
                      height={280}
                      className="rounded-md object-cover ring-2 ring-blue-200"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function TrashSpotComparison({
  report,
}: TrashSpotComparisonProps) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[560px]">
          <LoadingSpinner />
        </div>
      }
    >
      <TrashSpotComparisonContent report={report} />
    </Suspense>
  );
}
