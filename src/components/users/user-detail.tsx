import { useUserDetail } from "@/hooks/useUserDetail";
import {
  formatRelativeTime,
  formatTrashType,
  getTrashTypeColorClass,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface UserDetailProps {
  userId: number;
}

export default function UserDetail({ userId }: UserDetailProps) {
  const { data: user } = useUserDetail(userId);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm mb-2">유저 상세 정보</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">유저 ID:</span>
            <span className="text-gray-900">#{user.userId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">이메일:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">닉네임:</span>
            <span className="text-gray-900">{user.nickname}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">가입일:</span>
            <span className="text-gray-900">
              {formatRelativeTime(user.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 방문 기록 */}
      {user.visitedSpot.length > 0 && (
        <div>
          <h4 className="font-medium text-sm mb-2">
            방문 기록 ({user.visitedSpot.length}개)
          </h4>
          <div className="space-y-2">
            {user.visitedSpot.map((spot) => (
              <Card key={spot.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">#{spot.id}</span>
                        <Badge
                          variant="outline"
                          className={getTrashTypeColorClass(spot.trashType)}
                        >
                          {formatTrashType(spot.trashType)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {spot.spotName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {spot.address.city} - {spot.address.site}
                      </div>
                    </div>
                    {spot.imageUrl && (
                      <Image
                        src={spot.imageUrl}
                        alt="신고 이미지"
                        width={80}
                        height={60}
                        className="rounded-md object-cover flex-shrink-0"
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatRelativeTime(spot.updatedAt)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
