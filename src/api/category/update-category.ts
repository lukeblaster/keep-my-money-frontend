import { instance as axios } from "../axios";

export const updateCategory = async ({ props }: { props: any }) => {
  const response = await axios.patch("/category", props);

  return response;
};
