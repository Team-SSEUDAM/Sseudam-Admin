import { SUGGESTION_STATUS, TRASH_TYPE } from "@/constants/suggestion";

export type TrashType = (typeof TRASH_TYPE)[keyof typeof TRASH_TYPE];
export type SuggestionStatus =
  (typeof SUGGESTION_STATUS)[keyof typeof SUGGESTION_STATUS];

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

export interface ApiResponse {
  success: boolean;
  status: number;
  data: {
    list: TrashCanSuggestion[];
  };
  timestamp: string;
}

export interface SuggestionDetailResponse {
  success: boolean;
  status: number;
  data: TrashCanSuggestion;
  timestamp: string;
}

export interface SuggestionPage {
  list: TrashCanSuggestion[];
  nextPage?: number;
}
