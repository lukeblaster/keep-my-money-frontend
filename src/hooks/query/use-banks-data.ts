import { getBanks } from "@/api/banks/get-banks";
import { useQuery } from "@tanstack/react-query";

export const useBanksData = () => {
  return useQuery({
    queryKey: ["bank-accounts"],
    queryFn: getBanks,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
