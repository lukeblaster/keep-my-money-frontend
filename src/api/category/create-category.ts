import { instance as axios } from "../axios";

export const createCategory = async ({ props }: { props: any }) => {
  const response = await axios.post("/category", props);

  return response;
};
