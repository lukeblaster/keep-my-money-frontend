import { getCategories } from "../../api/category/get-categories";
import { useQuery } from "@tanstack/react-query";

export const useCategoryData = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
