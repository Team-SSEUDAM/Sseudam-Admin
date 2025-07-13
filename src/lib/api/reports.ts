import { apiRequest } from "@/lib/auth";
import { PAGE_SIZE } from "@/constants/pagination";
import type {
  ReportPage,
  ReportDetailResponse,
  TrashCanReport,
  ReportResponse,
} from "@/types/report";

export async function fetchReports({
  page = 0,
  searchType,
}: {
  page: number;
  searchType?: string;
}): Promise<ReportPage> {
  let url =
    process.env.NEXT_PUBLIC_API_URL +
    `/v1/admin/reports?page=${page}&size=${PAGE_SIZE}`;
  if (searchType && searchType !== "ALL") {
    url += `&searchType=${searchType}`;
  }
  const res = await apiRequest(url);
  if (!res.ok) throw new Error("신고 데이터를 불러오지 못했습니다");

  const apiResponse: ReportResponse = await res.json();

  if (!apiResponse.success) {
    throw new Error("API 요청이 실패했습니다");
  }

  const list = apiResponse.data.list;
  const totalCount = apiResponse.data.totalCount;

  return {
    list,
    nextPage: list.length === PAGE_SIZE ? page + 1 : undefined,
    totalCount,
  };
}

export async function fetchReportDetail(id: number): Promise<TrashCanReport> {
  const url = process.env.NEXT_PUBLIC_API_URL + `/v1/admin/reports/${id}`;
  const res = await apiRequest(url);

  if (!res.ok) {
    throw new Error("신고 상세 정보를 불러오지 못했습니다");
  }

  const apiResponse: ReportDetailResponse = await res.json();

  if (!apiResponse.success) {
    throw new Error("API 요청이 실패했습니다");
  }

  return apiResponse.data;
}

export async function updateReportStatus({
  reportId,
  spotId,
  status,
}: {
  reportId: number;
  spotId: number;
  status: string;
}): Promise<void> {
  const url = process.env.NEXT_PUBLIC_API_URL + `/v1/admin/reports/${reportId}`;
  const res = await apiRequest(url, {
    method: "PUT",
    body: JSON.stringify({ spotId, status }),
  });

  if (!res.ok) {
    throw new Error("신고 상태 변경에 실패했습니다");
  }
}
