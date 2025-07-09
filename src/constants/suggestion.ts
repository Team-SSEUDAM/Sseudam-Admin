import type { SuggestionStatus, TrashType } from "@/types/suggestion";

/**
 * 제보 상태 상수
 */
export const SUGGESTION_STATUS = {
  WAITING: "WAITING",
  APPROVE: "APPROVE",
  REJECT: "REJECT",
} as const;

/**
 * 쓰레기 타입 상수
 */
export const TRASH_TYPE = {
  GENERAL: "GENERAL",
  RECYCLE: "RECYCLE",
} as const;

/**
 * 제보 상태 한국어 매핑
 */
export const SUGGESTION_STATUS_LABELS: Record<SuggestionStatus, string> = {
  [SUGGESTION_STATUS.WAITING]: "대기중",
  [SUGGESTION_STATUS.APPROVE]: "승인",
  [SUGGESTION_STATUS.REJECT]: "반려",
};

/**
 * 쓰레기 타입 한국어 매핑
 */
export const TRASH_TYPE_LABELS: Record<TrashType, string> = {
  [TRASH_TYPE.GENERAL]: "일반",
  [TRASH_TYPE.RECYCLE]: "재활용",
};

/**
 * 제보 상태별 색상 클래스 매핑
 */
export const SUGGESTION_STATUS_COLORS: Record<SuggestionStatus, string> = {
  [SUGGESTION_STATUS.WAITING]: "text-yellow-600 bg-yellow-50 border-yellow-200",
  [SUGGESTION_STATUS.APPROVE]: "text-green-600 bg-green-50 border-green-200",
  [SUGGESTION_STATUS.REJECT]: "text-red-600 bg-red-50 border-red-200",
};

/**
 * 쓰레기 타입별 색상 클래스 매핑
 */
export const TRASH_TYPE_COLORS: Record<TrashType, string> = {
  [TRASH_TYPE.GENERAL]: "text-gray-600 bg-gray-50 border-gray-200",
  [TRASH_TYPE.RECYCLE]: "text-blue-600 bg-blue-50 border-blue-200",
};

/**
 * 제보 상태 옵션 (Select 컴포넌트용)
 */
export const SUGGESTION_STATUS_OPTIONS = [
  {
    value: SUGGESTION_STATUS.WAITING,
    label: SUGGESTION_STATUS_LABELS[SUGGESTION_STATUS.WAITING],
  },
  {
    value: SUGGESTION_STATUS.APPROVE,
    label: SUGGESTION_STATUS_LABELS[SUGGESTION_STATUS.APPROVE],
  },
  {
    value: SUGGESTION_STATUS.REJECT,
    label: SUGGESTION_STATUS_LABELS[SUGGESTION_STATUS.REJECT],
  },
];

/**
 * 쓰레기 타입 옵션 (Select 컴포넌트용)
 */
export const TRASH_TYPE_OPTIONS = [
  { value: TRASH_TYPE.GENERAL, label: TRASH_TYPE_LABELS[TRASH_TYPE.GENERAL] },
  { value: TRASH_TYPE.RECYCLE, label: TRASH_TYPE_LABELS[TRASH_TYPE.RECYCLE] },
];
