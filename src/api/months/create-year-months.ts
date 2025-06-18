import { instance as axios } from "../axios";

export const createMonths = async ({ props }: { props: any }) => {
  const response = await axios.post("/months", props);

  return response;
};
