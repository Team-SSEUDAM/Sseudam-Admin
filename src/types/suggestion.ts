import { TRASH_TYPE } from "@/constants/suggestion";
import { ApiResponse } from "./api";
import type { CommonStatus } from "@/constants/status";

export type TrashType = (typeof TRASH_TYPE)[keyof typeof TRASH_TYPE];
export type SuggestionStatus = CommonStatus;

export interface TrashCanSuggestion {
  id: number;
  point: {
    type: string;
    coordinates: number[];
  };
  region: string;
  address: {
    city: string;
    site: string;
  };
  trashType: TrashType;
  imageUrl: string;
  status: SuggestionStatus;
  createdAt: string;
}

export interface TrashCanSuggestionResponseData {
  list: TrashCanSuggestion[];
  totalCount: number;
}

export type TrashCanSuggestionResponse =
  ApiResponse<TrashCanSuggestionResponseData>;

export type SuggestionDetailResponse = ApiResponse<TrashCanSuggestion>;

export interface SuggestionPage {
  list: TrashCanSuggestion[];
  nextPage?: number;
  totalCount: number;
}
