import { ApiResponse } from "./api";
import type { CommonStatus } from "@/constants/status";
import { TrashType } from "./suggestion";

/**
 * 신고 타입 상수
 */
export const REPORT_TYPE = {
  POINT: "POINT", // 좌표가 잘못됨
  PHOTO: "PHOTO", // 사진이 잘못됨
  NAME: "NAME", // 이름이 잘못됨
  KIND: "KIND", // 종류가 잘못됨
} as const;

export type ReportType = (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];
export type ReportStatus = CommonStatus;

export interface Point {
  type: string;
  coordinates: number[];
}

export interface Address {
  city: string;
  site: string;
}

export interface TrashSpot {
  id: number;
  suggestionerId?: number;
  suggestionerName?: string;
  name: string;
  region: string;
  address: Address;
  point: Point;
  trashType: TrashType;
  visitCount: number;
  imageUrl?: string;
  lastVisitAt?: string;
  updatedAt: string;
}

export interface TrashCanReport {
  id: number;
  spotId: number;
  userId: number;
  reportType: ReportType;
  point: Point;
  address: Address;
  trashType: TrashType;
  spotName: string;
  imageUrl: string;
  status: ReportStatus;
  createdAt: string;
  rejectReason?: string;
}

export interface ReportResponseData {
  list: TrashCanReport[];
  totalCount: number;
}

export type ReportResponse = ApiResponse<ReportResponseData>;

export type ReportDetailResponse = ApiResponse<TrashCanReport>;

export interface ReportPage {
  list: TrashCanReport[];
  nextPage?: number;
  totalCount: number;
}
