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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useState } from "react";

interface TrashCanListItemProps {
  item: TrashCanSuggestion;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function TrashCanListItem({
  item,
  onApprove,
  onReject,
}: TrashCanListItemProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const isWaiting = item.status === "WAITING";

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
              {isWaiting && (onApprove || onReject) && (
                <div className="flex justify-center gap-3 pt-2">
                  {onApprove && (
                    <Button
                      onClick={() => onApprove(item.id)}
                      className="w-50 text-white"
                      style={{ backgroundColor: "#3EC7FF" }}
                    >
                      승인
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      onClick={() => onReject(item.id)}
                      className="w-50 text-white"
                      style={{ backgroundColor: "#FF5760" }}
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
