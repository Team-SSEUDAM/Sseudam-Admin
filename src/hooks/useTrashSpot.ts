import { useSuspenseQuery } from "@tanstack/react-query";
import { getTrashSpot } from "@/lib/api/trash-spots";

export function useTrashSpot(spotId: number) {
  return useSuspenseQuery({
    queryKey: ["trash-spot", spotId],
    queryFn: () => getTrashSpot(spotId),
  });
}
