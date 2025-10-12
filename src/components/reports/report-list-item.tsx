import { useState } from "react";
import type { TrashCanReport } from "@/types/report";
import {
  formatRelativeTime,
  formatReportType,
  formatReportStatus,
  getReportTypeColorClass,
  getReportStatusColorClass,
} from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TrashSpotComparison from "./trash-spot-comparison";

interface ReportListItemProps {
  item: TrashCanReport;
  onApprove: (reportId: number, spotId: number) => void;
  onReject: (reportId: number, spotId: number, reason: string) => void;
}

export default function ReportListItem({
  item,
  onApprove,
  onReject,
}: ReportListItemProps) {
  const isPending = item.status === "WAITING";
  const isRejected = item.status === "REJECT";
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [rejectReason, setRejectReason] = useState<string>("");

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
              {isRejected && item.rejectReason && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    반려 사유
                  </label>
                  <p className="text-sm text-red-500 rounded-md px-2 py-1 bg-red-50">
                    {item.rejectReason}
                  </p>
                </div>
              )}
              {/* 변경사항 비교 */}
              <TrashSpotComparison report={item} />

              {isPending && (
                <div className="space-y-4 pt-2">
                  {/* 액션 선택 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      처리 방안을 선택하세요
                    </label>

                    <div className="flex justify-between pt-1">
                      <ToggleGroup
                        type="single"
                        value={selectedAction}
                        onValueChange={setSelectedAction}
                        className="justify-start"
                        variant="outline"
                      >
                        <ToggleGroupItem
                          value="approve"
                          className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
                        >
                          승인
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="reject"
                          className="data-[state=on]:bg-red-600 data-[state=on]:text-white"
                        >
                          반려
                        </ToggleGroupItem>
                      </ToggleGroup>

                      {/* 확인 버튼 */}
                      {selectedAction && (
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => {
                              setSelectedAction("");
                              setRejectReason("");
                            }}
                            size="md"
                            variant="outline"
                          >
                            취소
                          </Button>
                          <Button
                            onClick={() => {
                              if (selectedAction === "approve") {
                                onApprove(item.id, item.spotId);
                              } else if (selectedAction === "reject") {
                                onReject(item.id, item.spotId, rejectReason);
                              }
                              setSelectedAction("");
                              setRejectReason("");
                            }}
                            size="md"
                            disabled={
                              selectedAction === "reject" &&
                              !rejectReason.trim()
                            }
                            className={
                              selectedAction === "approve"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-red-600 hover:bg-red-700"
                            }
                          >
                            확인
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 반려 사유 입력 */}
                  {selectedAction === "reject" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        반려 사유를 입력하세요
                      </label>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="반려 사유를 입력해주세요..."
                        className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      />
                    </div>
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
