import type { TrashCanReport } from "@/types/report";
import type { TrashType } from "@/types/suggestion";
import {
  formatRelativeTime,
  formatReportType,
  formatReportStatus,
  formatTrashType,
  getReportTypeColorClass,
  getReportStatusColorClass,
  getTrashTypeColorClass,
  getGoogleMapSearchUrl,
} from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface ReportListItemProps {
  item: TrashCanReport;
  onApprove?: (reportId: number, spotId: number) => void;
  onReject?: (reportId: number, spotId: number) => void;
}

export default function ReportListItem({
  item,
  onApprove,
  onReject,
}: ReportListItemProps) {
  const isPending = item.status === "WAITING";
  const [lng, lat] = item.point.coordinates;

  return (
    <Card className="hover:shadow-md transition-shadow py-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-sm">#{item.id}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  쓰레기통 #{item.spotId}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className={getReportTypeColorClass(item.reportType)}
                >
                  {formatReportType(item.reportType)}
                </Badge>
                <Badge
                  variant="outline"
                  className={getReportStatusColorClass(item.status)}
                >
                  {formatReportStatus(item.status)}
                </Badge>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">신고 상세 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">위치:</span>
                    <span className="text-gray-900">
                      {item.address.city} - {item.address.site}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">좌표:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">
                        {lat}, {lng}
                      </span>
                      <a
                        href={getGoogleMapSearchUrl(lat, lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Google Map
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">쓰레기 종류:</span>
                    <Badge
                      variant="outline"
                      className={getTrashTypeColorClass(
                        item.trashType as TrashType
                      )}
                    >
                      {formatTrashType(item.trashType as TrashType)}
                    </Badge>
                  </div>

                  {item.imageUrl && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">이미지:</span>
                      <div className="flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt="신고 이미지"
                          width={400}
                          height={300}
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isPending && (onApprove || onReject) && (
                <div className="flex justify-end gap-2 pt-2">
                  {onApprove && (
                    <Button
                      onClick={() => onApprove(item.id, item.spotId)}
                      size="md"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      승인
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      onClick={() => onReject(item.id, item.spotId)}
                      size="md"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      반려
                    </Button>
                  )}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
