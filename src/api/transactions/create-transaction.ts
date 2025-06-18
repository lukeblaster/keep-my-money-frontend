import { instance as axios } from "../axios";

export const createTransaction = async ({ props }: { props: any }) => {
  const response = await axios.post("/transaction", props);

  return response;
};
