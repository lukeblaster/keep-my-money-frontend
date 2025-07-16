import { getYears } from "../../api/months/get-years";
import { useQuery } from "@tanstack/react-query";

export const useYearsData = () => {
  return useQuery({
    queryKey: ["years"],
    queryFn: getYears,
    staleTime: 1000 * 60 * 5,
  });
};
