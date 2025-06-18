import { getMonths } from "@/api/months/get-months";
import { useQuery } from "@tanstack/react-query";

export const useMonthsData = () => {
  return useQuery({
    queryKey: ["months"],
    queryFn: getMonths,
    staleTime: 1000 * 60 * 5,
  });
};
