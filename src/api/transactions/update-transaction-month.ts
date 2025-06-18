import { instance as axios } from "../axios";

export const updateTransactionOnMonth = async ({ props }: { props: any }) => {
  const response = await axios.patch("/transaction", props);

  return response;
};
