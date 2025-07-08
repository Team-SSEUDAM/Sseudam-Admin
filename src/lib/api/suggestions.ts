import { apiRequest } from "@/lib/auth";
import type {
  SuggestionPage,
  SuggestionDetailResponse,
  TrashCanSuggestion,
  TrashCanSuggestionResponse,
} from "@/types/suggestion";

const PAGE_SIZE = 20;

export async function fetchSuggestions({
  page = 0,
}: {
  page: number;
}): Promise<SuggestionPage> {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    `/v1/admin/suggestions?page=${page}&size=${PAGE_SIZE}`;
  const res = await apiRequest(url);
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다");

  const apiResponse: TrashCanSuggestionResponse = await res.json();

  if (!apiResponse.success) {
    throw new Error("API 요청이 실패했습니다");
  }

  const list = apiResponse.data.list;

  return {
    list,
    nextPage: list.length === PAGE_SIZE ? page + 1 : undefined,
  };
}

export async function fetchSuggestionDetail(
  id: number
): Promise<TrashCanSuggestion> {
  const url = process.env.NEXT_PUBLIC_API_URL + `/v1/admin/suggestions/${id}`;
  const res = await apiRequest(url);

  if (!res.ok) {
    throw new Error("상세 정보를 불러오지 못했습니다");
  }

  const apiResponse: SuggestionDetailResponse = await res.json();

  if (!apiResponse.success) {
    throw new Error("API 요청이 실패했습니다");
  }

  return apiResponse.data;
}
