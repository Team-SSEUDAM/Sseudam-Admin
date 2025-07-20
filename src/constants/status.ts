/**
 * 공통 상태 타입
 */
export type CommonStatus = "WAITING" | "APPROVE" | "REJECT";

/**
 * 공통 상태 상수
 */
export const COMMON_STATUS = {
  WAITING: "WAITING",
  APPROVE: "APPROVE",
  REJECT: "REJECT",
} as const;

/**
 * 공통 상태 한국어 매핑
 */
export const STATUS_LABELS: Record<CommonStatus, string> = {
  [COMMON_STATUS.WAITING]: "대기중",
  [COMMON_STATUS.APPROVE]: "승인",
  [COMMON_STATUS.REJECT]: "반려",
};
