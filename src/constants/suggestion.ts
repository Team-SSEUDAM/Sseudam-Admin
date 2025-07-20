import type { SuggestionStatus, TrashType } from "@/types/suggestion";
import { COMMON_STATUS } from "@/constants/status";

/**
 * 쓰레기통 타입 상수
 */
export const TRASH_TYPE = {
  GENERAL: "GENERAL",
  RECYCLE: "RECYCLE",
} as const;

/**
 * 제보 상태별 색상 클래스 매핑
 */
export const SUGGESTION_STATUS_COLORS: Record<SuggestionStatus, string> = {
  [COMMON_STATUS.WAITING]: "text-yellow-600 bg-yellow-50 border-yellow-200",
  [COMMON_STATUS.APPROVE]: "text-green-600 bg-green-50 border-green-200",
  [COMMON_STATUS.REJECT]: "text-red-600 bg-red-50 border-red-200",
};

/**
 * 쓰레기통 타입별 색상 클래스 매핑
 */
export const TRASH_TYPE_COLORS: Record<TrashType, string> = {
  [TRASH_TYPE.GENERAL]: "text-gray-600 bg-gray-50 border-gray-200",
  [TRASH_TYPE.RECYCLE]: "text-blue-600 bg-blue-50 border-blue-200",
};

/**
 * 쓰레기통 타입 옵션 (Select 컴포넌트용)
 */
export const TRASH_TYPE_OPTIONS = [
  {
    value: TRASH_TYPE.GENERAL,
    label: "일반",
  },
  {
    value: TRASH_TYPE.RECYCLE,
    label: "재활용",
  },
];

/**
 * 제보 상태 옵션 (Select 컴포넌트용)
 */
export const SUGGESTION_STATUS_OPTIONS = [
  {
    value: COMMON_STATUS.WAITING,
    label: "대기중",
  },
  {
    value: COMMON_STATUS.APPROVE,
    label: "승인",
  },
  {
    value: COMMON_STATUS.REJECT,
    label: "반려",
  },
];
