import { getTransactions } from "../../api/transactions/get-transactions";
import { useQuery } from "@tanstack/react-query";

export const useTransactionsData = ({
  month_name,
  year,
}: {
  month_name: string;
  year: number;
}) => {
  return useQuery({
    queryKey: ["transactions", [year, month_name]],
    queryFn: () => getTransactions({ year, month_name }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
