import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SuggestionStatus, TrashType } from "@/types/suggestion";
import {
  SUGGESTION_STATUS_LABELS,
  TRASH_TYPE_LABELS,
  SUGGESTION_STATUS_COLORS,
  TRASH_TYPE_COLORS,
} from "@/constants/suggestion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ISO 8601 형식의 날짜 문자열을 한국어 형식으로 변환
 * @param dateString - "2025-07-03T12:08:46.028" 형식의 날짜 문자열
 * @returns "25.07.03 12:08" 형식의 문자열
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    // 유효하지 않은 날짜인 경우 원본 문자열 반환
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear().toString().slice(-2); // 뒤의 2자리만
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch {
    // 파싱 오류 시 원본 문자열 반환
    return dateString;
  }
}

/**
 * 상대적 시간 표시 (예: "3분 전", "1시간 전", "2일 전")
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 상대적 시간 문자열
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    // 유효하지 않은 날짜인 경우 원본 형식으로 반환
    if (isNaN(date.getTime())) {
      return formatDate(dateString);
    }

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return formatDate(dateString);
    }
  } catch {
    return formatDate(dateString);
  }
}

/**
 * 제보 상태를 한국어로 변환
 * @param status - 제보 상태 (WAITING, APPROVE, REJECT)
 * @returns 한국어 상태 텍스트
 */
export function formatSuggestionStatus(status: SuggestionStatus): string {
  return SUGGESTION_STATUS_LABELS[status] || status;
}

/**
 * 쓰레기 타입을 한국어로 변환
 * @param trashType - 쓰레기 타입 (GENERAL, RECYCLE)
 * @returns 한국어 타입 텍스트
 */
export function formatTrashType(trashType: TrashType): string {
  return TRASH_TYPE_LABELS[trashType] || trashType;
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
 * 쓰레기 타입에 따른 색상 클래스 반환
 * @param trashType - 쓰레기 타입
 * @returns Tailwind CSS 색상 클래스
 */
export function getTrashTypeColorClass(trashType: TrashType): string {
  return (
    TRASH_TYPE_COLORS[trashType] || "text-gray-600 bg-gray-50 border-gray-200"
  );
}
