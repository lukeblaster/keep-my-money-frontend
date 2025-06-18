import { getDashboardInfo } from "@/api/dashboard/get-dashboard-info";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardInfo,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
