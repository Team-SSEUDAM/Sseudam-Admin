import type { TrashCanSuggestion } from "@/types/suggestion";
import {
  formatRelativeTime,
  formatSuggestionStatus,
  formatTrashType,
  getStatusColorClass,
  getTrashTypeColorClass,
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
import Image from "next/image";
import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

interface TrashCanListItemProps {
  item: TrashCanSuggestion;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}

export default function TrashCanListItem({
  item,
  onApprove,
  onReject,
}: TrashCanListItemProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const isWaiting = item.status === "WAITING";
  const isRejected = item.status === "REJECT";
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [rejectReason, setRejectReason] = useState<string>("");

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(item.spotName);
    toast.success("클립보드에 저장하였습니다.");
  };

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
                <button
                  className="group font-semibold truncate pb-1 flex gap-2 items-center"
                  onClick={handleCopy}
                >
                  <span className="group-hover:underline underline-offset-2">
                    {item.spotName}
                  </span>
                  <CopyIcon className="w-4 h-4" />
                </button>
                <div className="text-sm text-muted-foreground truncate">
                  {item.address.city} - {item.address.site}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className={getTrashTypeColorClass(item.trashType)}
                >
                  {formatTrashType(item.trashType)}
                </Badge>
                <Badge
                  variant="outline"
                  className={getStatusColorClass(item.status)}
                >
                  {formatSuggestionStatus(item.status)}
                </Badge>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* 반려 사유 표시 */}
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

              {/* 이미지 */}
              {item.imageUrl && (
                <div className="flex justify-center">
                  <div className="relative">
                    {/* 로딩 스피너 */}
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                      </div>
                    )}

                    {/* 에러 상태 */}
                    {imageError && (
                      <div className="flex items-center justify-center bg-gray-100 rounded-lg w-[600px] h-[600px]">
                        <div className="text-center text-gray-500">
                          <div className="text-lg mb-2">
                            이미지를 불러올 수 없습니다
                          </div>
                          <div className="text-sm">
                            이미지 URL을 확인해주세요
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 이미지 */}
                    <Image
                      src={item.imageUrl}
                      alt="제보 이미지"
                      className={`rounded-lg transition-opacity duration-300 ${
                        imageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      width={600}
                      height={600}
                      onLoad={() => setImageLoading(false)}
                      onError={() => {
                        setImageLoading(false);
                        setImageError(true);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 액션 버튼 */}
              {isWaiting && (
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
                                onApprove(item.id);
                              } else if (selectedAction === "reject") {
                                onReject(item.id, rejectReason);
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
