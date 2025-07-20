import { apiRequest } from "@/lib/auth";
import type { TrashSpot } from "@/types/report";

export async function getTrashSpot(spotId: number): Promise<TrashSpot> {
  const response = await apiRequest(
    process.env.NEXT_PUBLIC_API_URL + `/v1/trash-spots/${spotId}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.data;
}
