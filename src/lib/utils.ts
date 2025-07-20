import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SuggestionStatus, TrashType } from "@/types/suggestion";
import type { ReportType, ReportStatus } from "@/types/report";
import {
  SUGGESTION_STATUS_COLORS,
  TRASH_TYPE_COLORS,
  TRASH_TYPE,
} from "@/constants/suggestion";
import { STATUS_LABELS, COMMON_STATUS } from "@/constants/status";
import { REPORT_TYPE } from "@/types/report";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 상대 시간 포맷팅 (예: "3분 전", "1시간 전")
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷된 상대 시간 문자열
 */
export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
}

/**
 * 제보 상태 포맷팅
 * @param status - 제보 상태
 * @returns 포맷된 라벨
 */
export function formatSuggestionStatus(status: SuggestionStatus): string {
  return STATUS_LABELS[status] || status;
}

/**
 * 쓰레기통 타입 포맷팅
 * @param type - 쓰레기통 타입
 * @returns 포맷된 라벨
 */
export function formatTrashType(type: TrashType): string {
  const TRASH_TYPE_LABELS: Record<TrashType, string> = {
    [TRASH_TYPE.GENERAL]: "일반",
    [TRASH_TYPE.RECYCLE]: "재활용",
  };
  return TRASH_TYPE_LABELS[type] || type;
}

/**
 * 제보 상태에 따른 색상 클래스 반환
 * @param status - 제보 상태
 * @returns Tailwind CSS 색상 클래스
 */
export function getStatusColorClass(status: SuggestionStatus): string {
  return (
    SUGGESTION_STATUS_COLORS[status] ||
    "text-gray-600 bg-gray-50 border-gray-200"
  );
}

/**
 * 쓰레기통 타입에 따른 색상 클래스 반환
 * @param type - 쓰레기통 타입
 * @returns Tailwind CSS 색상 클래스
 */
export function getTrashTypeColorClass(type: TrashType): string {
  return TRASH_TYPE_COLORS[type] || "text-gray-600 bg-gray-50 border-gray-200";
}

/**
 * 신고 타입 라벨 매핑
 */
export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  [REPORT_TYPE.POINT]: "좌표",
  [REPORT_TYPE.PHOTO]: "사진",
  [REPORT_TYPE.NAME]: "이름",
  [REPORT_TYPE.KIND]: "종류",
};

/**
 * 신고 타입별 색상 클래스 매핑
 */
export const REPORT_TYPE_COLORS: Record<ReportType, string> = {
  [REPORT_TYPE.POINT]: "text-blue-600 bg-blue-50 border-blue-200",
  [REPORT_TYPE.PHOTO]: "text-purple-600 bg-purple-50 border-purple-200",
  [REPORT_TYPE.NAME]: "text-orange-600 bg-orange-50 border-orange-200",
  [REPORT_TYPE.KIND]: "text-red-600 bg-red-50 border-red-200",
};

/**
 * 신고 상태별 색상 클래스 매핑
 */
export const REPORT_STATUS_COLORS: Record<ReportStatus, string> = {
  [COMMON_STATUS.WAITING]: "text-yellow-600 bg-yellow-50 border-yellow-200",
  [COMMON_STATUS.APPROVE]: "text-green-600 bg-green-50 border-green-200",
  [COMMON_STATUS.REJECT]: "text-red-600 bg-red-50 border-red-200",
};

/**
 * 신고 타입 포맷팅
 * @param type - 신고 타입
 * @returns 포맷된 라벨
 */
export function formatReportType(type: ReportType): string {
  return REPORT_TYPE_LABELS[type] || type;
}

/**
 * 신고 상태 포맷팅
 * @param status - 신고 상태
 * @returns 포맷된 라벨
 */
export function formatReportStatus(status: ReportStatus): string {
  return STATUS_LABELS[status] || status;
}

/**
 * 신고 타입에 따른 색상 클래스 반환
 * @param type - 신고 타입
 * @returns Tailwind CSS 색상 클래스
 */
export function getReportTypeColorClass(type: ReportType): string {
  return REPORT_TYPE_COLORS[type] || "text-gray-600 bg-gray-50 border-gray-200";
}

/**
 * 신고 상태에 따른 색상 클래스 반환
 * @param status - 신고 상태
 * @returns Tailwind CSS 색상 클래스
 */
export function getReportStatusColorClass(status: ReportStatus): string {
  return (
    REPORT_STATUS_COLORS[status] || "text-gray-600 bg-gray-50 border-gray-200"
  );
}

/**
 * 위도, 경도를 DMS 형식으로 변환
 * @param latitude - 위도
 * @param longitude - 경도
 * @returns DMS 형식의 위도, 경도 문자열
 */
export function convertLatLngToDMSString(latitude: number, longitude: number) {
  function toDMS(decimal: number, isLatitude: boolean): string {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = (minutesFloat - minutes) * 60;

    const direction = isLatitude
      ? decimal >= 0
        ? "N"
        : "S"
      : decimal >= 0
      ? "E"
      : "W";

    const formattedSeconds = seconds.toFixed(2);
    return `${degrees}°${minutes}'${formattedSeconds}"${direction}`;
  }

  const latStr = toDMS(latitude, true);
  const lngStr = toDMS(longitude, false);

  return [latStr, lngStr];
}

/**
 * 구글 맵 검색 URL 생성
 * @param latitude - 위도
 * @param longitude - 경도
 * @returns 구글 맵 검색 URL
 */
export function getGoogleMapSearchUrl(latitude: number, longitude: number) {
  const [latStr, lngStr] = convertLatLngToDMSString(latitude, longitude);
  return `https://www.google.com/maps/search/${latStr}+${lngStr}`;
}
